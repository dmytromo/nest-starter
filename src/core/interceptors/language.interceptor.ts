import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ClsService} from 'nestjs-cls';
import {Response} from 'express';

interface IRequest extends Request {
  i18nLang: string;
}

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  constructor(private readonly cls: ClsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<IRequest>();
    const response = context.switchToHttp().getResponse<Response>();
    const language = request.i18nLang;
    this.cls.set('language', language);

    return next.handle().pipe(
      tap(() => {
        response.setHeader('Content-Language', language);
      }),
    );
  }
}
