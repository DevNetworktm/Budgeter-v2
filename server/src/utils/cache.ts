import { RedisClientType } from "redis";

interface CacheOptions {
  redis: RedisClientType;
  redisExpire?: number;
}

async function cache(
  name: string,
  value: () => any,
  options: CacheOptions
): Promise<ReturnType<typeof value>> {
  const { redis } = options;

  const cached = await redis.get(name);

  if (cached !== null && cached !== "null") {
    return JSON.parse(cached);
  }

  const result = await value();
  // mise en cache
  await redis.set(name, JSON.stringify(result), {
    EX: options.redisExpire || 60,
  });

  return result;
}

export default cache;
