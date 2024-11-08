import {IsNumber, IsString, Max, Min} from 'class-validator';

export class DbConfig {
  /**
   * Should be IsUrl(), changed to IsString due to docker-compose works with HOST as container name
   */
  @IsString()
  DB_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_DATABASE: string;
}
