import {Test} from '@nestjs/testing';
import * as path from 'node:path';
import * as os from 'node:os';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';
import {loggerModuleFactory} from './logger-module-factory';
import {Logger} from 'nestjs-pino';
import {__resetOutOfContextForTests} from 'nestjs-pino/PinoLogger';

describe('loggerModule', () => {
  let destination: string;
  let logger: Logger;

  beforeAll(() => {
    process.env.LOG_LEVEL = 'info';
  });

  afterAll(() => {
    delete process.env.LOG_LEVEL;
  });

  afterEach(() => {
    __resetOutOfContextForTests(); // do not remove
    fs.rmSync(destination);
  });

  beforeEach(async () => {
    destination = path.join(os.tmpdir(), crypto.randomUUID() + '.log');
    const moduleRef = await Test.createTestingModule({
      imports: [
        loggerModuleFactory({
          transport: {
            target: 'pino/file',
            options: {destination},
          },
        }),
      ],
    }).compile();

    logger = moduleRef.get(Logger);
  });

  it('should log with log level as label', async () => {
    logger.log('log');
    logger.error('error');
    await watchFileCreated(destination);
    const result = readLogs(destination);
    expect(result).toEqual([
      {level: 'info', msg: 'log'},
      {level: 'error', msg: 'error'},
    ]);
  });

  it('should log with log level as label', async () => {
    logger.debug('debug');
    logger.log('log');
    await watchFileCreated(destination);
    const result = readLogs(destination);
    expect(result).toEqual([{level: 'info', msg: 'log'}]);
  });
});

function readLogs(filepath: string): unknown[] {
  return fs
    .readFileSync(filepath, 'utf-8')
    .split(os.EOL)
    .filter((x) => x !== '')
    .map((x) => {
      const obj = JSON.parse(x) as Record<string, unknown>;
      delete obj['hostname'];
      delete obj['pid'];
      delete obj['time'];
      return obj;
    });
}

/**
 * Source: https://github.com/pinojs/pino/blob/06df1df8a33262a0a0a268087f1a30cd44be6850/test/helper.js#L59
 */
function watchFileCreated(filename: string) {
  return new Promise<void>((resolve, reject) => {
    const TIMEOUT: number = Number.parseInt(process.env.PINO_TEST_WAIT_WATCHFILE_TIMEOUT || '10000', 10);
    const INTERVAL = 100;
    const threshold = TIMEOUT / INTERVAL;
    let counter = 0;
    const interval = setInterval(() => {
      const exists = fs.existsSync(filename);
      // On some CI runs file is created but not filled
      if (exists && fs.statSync(filename).size !== 0) {
        clearInterval(interval);
        resolve();
      } else if (counter <= threshold) {
        counter++;
      } else {
        clearInterval(interval);
        reject(
          new Error(
            `${filename} hasn't been created within ${TIMEOUT} ms. ` +
              (exists ? 'File exist, but still empty.' : 'File not yet created.'),
          ),
        );
      }
    }, INTERVAL);
  });
}
