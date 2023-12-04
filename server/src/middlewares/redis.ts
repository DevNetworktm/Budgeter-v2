import { createClient, type RedisClientType } from "redis";
import type { NextFunction, Request, Response } from "express";

let client: RedisClientType;

/**
 * Initializes the Redis client and connects to the Redis server.
 */
(async () => {
  client = await createClient({
    url: process.env.REDIS_URL,
  });
  client.on("error", (err) => console.log("Redis Client Error", err));
  client.connect();
})();

/**
 * Middleware function that adds the Redis client to the request object.
 * @param req - The Express request object.
 * @param _ - The Express response object.
 * @param next - The next middleware function.
 */
function RedisMiddleware(req: Request, _: Response, next: NextFunction) {
  req.redis = client;
  next();
}

/**
 * Closes the Redis connection and releases the client resources.
 */
export function closeRedis() {
  client.quit();
}

export default RedisMiddleware;
