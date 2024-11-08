/* eslint-disable @typescript-eslint/unbound-method */
import {Test, TestingModule} from '@nestjs/testing';
import {ClsModule, ClsService} from 'nestjs-cls';
import {ExecutionContext} from '@nestjs/common';
import {of} from 'rxjs';
import {LanguageInterceptor} from './language.interceptor';

describe('LanguageInterceptor', () => {
  let interceptor: LanguageInterceptor;
  let clsService: ClsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ClsModule],
      providers: [LanguageInterceptor],
    }).compile();

    interceptor = module.get<LanguageInterceptor>(LanguageInterceptor);
    clsService = module.get<ClsService>(ClsService);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should set language in ClsService and set response header', async () => {
    const setHeaderMock = jest.fn();

    const context = {
      switchToHttp: () => ({
        getRequest: () => ({i18nLang: 'en'}),
        getResponse: () => ({setHeader: setHeaderMock}),
      }),
    } as unknown as ExecutionContext;

    clsService.set = jest.fn();

    await interceptor.intercept(context, {handle: () => of('test')}).toPromise();

    expect(clsService.set).toHaveBeenCalledWith('language', 'en');
    expect(setHeaderMock).toHaveBeenCalledWith('Content-Language', 'en');
  });
});
