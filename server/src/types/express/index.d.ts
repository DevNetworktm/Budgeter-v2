import { PrismaClient, Users } from "@prisma/client";
import type { RedisClientType } from "redis";

export {};

/**
 * Extends the Express Request interface to include the `prisma` property.
 */
declare global {
  namespace Express {
    export interface Request {
      prisma: PrismaClient;
      redis: RedisClientType;
      user?: Users;
      cookies: {
        token?: string;
      };
    }
  }
}
