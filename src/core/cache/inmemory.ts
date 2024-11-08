import {CacheModule} from '@nestjs/cache-manager';

export const InMemoryCache = CacheModule.register({
  isGlobal: true,
  store: 'memory',
  ttl: 5 * 1000, // Default value is 5 seconds
});
