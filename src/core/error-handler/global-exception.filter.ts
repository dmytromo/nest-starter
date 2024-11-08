import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus} from '@nestjs/common';
import {HttpAdapterHost} from '@nestjs/core';
import {ICommonException} from './interfaces/common-exception.interface';
import {ServerResponse} from 'node:http';

function getErrorMessage(error: unknown): string {
  if (error instanceof HttpException || error instanceof Error) return error.message;
  return String(error);
}

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const {httpAdapter} = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const isHttpException = exception instanceof HttpException;
    const httpStatus = isHttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = getErrorMessage(exception) ?? 'Internal server error';
    const title = isHttpException ? exception.name : 'Internal server error';

    const responseBody: ICommonException = {
      status: httpStatus,
      timestamp: new Date().toISOString(),
      title: title,
      detail: message,
    };

    const response: ServerResponse = ctx.getResponse();
    response.setHeader('content-type', 'application/problem+json; charset=utf-8');
    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
