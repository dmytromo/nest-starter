import type pino from 'pino';
import {IsIn} from 'class-validator';

/**
 * Copy&paste from pino repo
 */
const DEFAULT_LEVELS = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

export class LoggerConfig {
  @IsIn(Object.keys(DEFAULT_LEVELS))
  LOG_LEVEL: pino.Level;
}
