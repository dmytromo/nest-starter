import {Environments} from './constants';
import {IsIn, IsPort} from 'class-validator';

export class ServerConfig {
  @IsIn(Object.values(Environments))
  ENV: string;

  @IsPort()
  PORT: string;
}
