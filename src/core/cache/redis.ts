import {CacheModule, CacheModuleOptions, CacheOptionsFactory} from '@nestjs/cache-manager';
import {redisStore} from 'cache-manager-redis-yet';
import {Injectable} from '@nestjs/common';
import {RedisConfig} from '../config/redis.config';
import {parseDotenvFile, SaferConfigModule} from 'nestjs-safer-config';

@Injectable()
class CacheConfigFactory implements CacheOptionsFactory {
  constructor(private redisConfig: RedisConfig) {}
  async createCacheOptions(): Promise<CacheModuleOptions> {
    return {
      store: await redisStore({
        socket: {
          host: this.redisConfig.REDIS_HOST,
          port: this.redisConfig.REDIS_PORT,
        },
        password: this.redisConfig.REDIS_PASSWORD,
        ttl: 60 * 1000, // Default value is 5 seconds
        database: this.redisConfig.REDIS_DB,
      }),
      isGlobal: true,
    };
  }
}

export const CacheRedis = CacheModule.registerAsync({
  imports: [
    SaferConfigModule.register({
      createInstanceOf: RedisConfig,
      sources: [parseDotenvFile(), process.env],
    }),
  ],
  useClass: CacheConfigFactory,
});
