import {HttpStatus, INestApplication, ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {Logger} from 'nestjs-pino';
import {API_DOC_PATH} from './core/config/constants';
import helmet from 'helmet';

export function setup(app: INestApplication): INestApplication {
  app.useLogger(app.get(Logger));
  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({transform: true, errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY}));

  const config = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('Boilerplate service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(API_DOC_PATH, app, document);

  return app;
}
