import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {HealthModule} from './health/health.module';
import {ClsModule, ClsService} from 'nestjs-cls';
import {v4 as uuid} from 'uuid';
import {Request} from 'express';
import {CacheRedis} from './core/cache/redis';
import {TypeOrm} from './core/db/typeOrm';
import {UsersModule} from './users/users.module';
import {loggerModuleFactory} from './core/logger/logger-module-factory';
import {SaferConfigModule, parseDotenvFile} from 'nestjs-safer-config';
import {ServerConfig} from './core/config/server.config';
import {AcceptLanguageResolver, I18nModule} from 'nestjs-i18n';
import * as path from 'path';
import {LanguageInterceptor} from './core/interceptors/language.interceptor';
import {APP_INTERCEPTOR} from '@nestjs/core';
import {DEFAULT_LANGUAGE} from './core/config/i18n.constant';

@Module({
  imports: [
    SaferConfigModule.register({
      createInstanceOf: ServerConfig,
      sources: [parseDotenvFile(), process.env],
    }),
    loggerModuleFactory(),
    CacheRedis,
    TypeOrm,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => (req.headers['x-request-id'] as string) ?? uuid(),
        setup: (cls: ClsService) => {
          /**
           * Here we can set any values to the async context.
           */
          cls.set('x-idempotency-key', uuid());
        },
      },
    }),
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LANGUAGE,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [AcceptLanguageResolver],
    }),
    HealthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LanguageInterceptor,
    },
  ],
})
export class AppModule {}
