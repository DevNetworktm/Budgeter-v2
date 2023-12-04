import { closePrisma } from "../middlewares/prisma";
import { closeRedis } from "../middlewares/redis";

/**
 * Closes the Prisma connection and Redis connection after all tests have finished.
 */
afterAll(async () => {
  await closePrisma();
  await closeRedis();
});
