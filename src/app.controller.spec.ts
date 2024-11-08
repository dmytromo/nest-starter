import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {mockDeep} from 'jest-mock-extended';
import {LoggerModule} from 'nestjs-pino';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      controllers: [AppController],
      providers: [AppService],
    })
      .useMocker(() => mockDeep)
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello!"', () => {
      expect(appController.getHello()).toBe('Hello!');
    });
  });
});
