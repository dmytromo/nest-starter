import {Logger} from '@nestjs/common';
import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {NestExpressApplication} from '@nestjs/platform-express';
import {AppModule} from './app.module';
import {API_DOC_PATH} from './core/config/constants';
import {ServerConfig} from './core/config/server.config';
import {GlobalExceptionsFilter} from './core/error-handler/global-exception.filter';
import {setup} from './setup';

async function bootstrap() {
  const app = setup(
    await NestFactory.create<NestExpressApplication>(AppModule, {
      bufferLogs: true,
    }),
  );
  const configService = app.get(ServerConfig);

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new GlobalExceptionsFilter(httpAdapterHost));

  await app.listen(configService.PORT);

  const appUrl = await app.getUrl();
  Logger.log(`App started on ${appUrl}`);
  Logger.log(`Api doc URL on ${appUrl}${API_DOC_PATH}`);
}
void bootstrap();
