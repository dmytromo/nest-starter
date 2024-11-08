import {LoggerModule} from 'nestjs-pino';
import type {Params} from 'nestjs-pino/params';
import {SaferConfigModule, parseDotenvFile} from 'nestjs-safer-config';
import {LoggerConfig} from '../config/logger.config';

export const loggerModuleFactory = (configMixin: Params['pinoHttp'] = {}) =>
  LoggerModule.forRootAsync({
    imports: [
      SaferConfigModule.register({
        createInstanceOf: LoggerConfig,
        sources: [parseDotenvFile(), process.env],
      }),
    ],
    inject: [LoggerConfig],
    useFactory: (loggerConfig: LoggerConfig) => {
      return {
        useExisting: true, // do not create pino-http middleware
        pinoHttp: {
          level: loggerConfig.LOG_LEVEL,
          formatters: {
            level(label) {
              // The log level cannot be customized when using multiple transports
              return {level: label};
            },
          },
          ...configMixin,
        },
      };
    },
  });
