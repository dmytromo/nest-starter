import {IsInt, IsNumber, IsString, Max, Min} from 'class-validator';

export class RedisConfig {
  /**
   * Should be IsUrl(), changed to IsString due to docker-compose works with HOST as container name
   */
  @IsString()
  REDIS_HOST: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  REDIS_PORT: number;

  @IsString()
  REDIS_PASSWORD: string;

  @IsInt()
  REDIS_DB: number = 0;
}
