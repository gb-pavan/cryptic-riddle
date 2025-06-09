import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, '10 s'), // max 5 requests per 10 seconds
  analytics: true,
  prefix: '@rate/secure',
});
