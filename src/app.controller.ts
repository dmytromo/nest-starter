import {Controller, Get, HttpException, HttpStatus, Logger, Param} from '@nestjs/common';
import {AppService} from './app.service';
import {Environments} from './core/config/constants';
import {ServerConfig} from './core/config/server.config';
import {LinkBadRequestException} from './core/error-handler/exceptions/bad-request.exception';
import {LinkForbiddenException} from './core/error-handler/exceptions/forbidden.exception';
import {LinkUnauthorizedException} from './core/error-handler/exceptions/unauthorized.exception';
import {LinkUnprocessableEntityException} from './core/error-handler/exceptions/unprocessable.exception';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly serverConfig: ServerConfig,
  ) {}

  @Get()
  getHello(): string {
    if (this.serverConfig.ENV === Environments.Development) {
      Logger.log('Hello from the development environment');
    }
    return this.appService.getHello();
  }

  @Get('/error/:errorStatusCode')
  trowErrorExample(@Param('errorStatusCode') errorStatusCode: number): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (errorStatusCode === HttpStatus.BAD_REQUEST) throw new LinkBadRequestException();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (errorStatusCode === HttpStatus.FORBIDDEN) throw new LinkForbiddenException();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (errorStatusCode === HttpStatus.UNAUTHORIZED)
      throw new LinkUnauthorizedException('Authentication token has expired. Please request a new one');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (errorStatusCode === HttpStatus.UNPROCESSABLE_ENTITY) throw new LinkUnprocessableEntityException();

    if (errorStatusCode >= 400) throw new HttpException('Here is controller exception', errorStatusCode);

    return this.appService.getHello();
  }
}
