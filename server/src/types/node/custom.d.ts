import { Secret } from "jsonwebtoken";

export {};
/**
 * Extends the NodeJS ProcessEnv interface to include the `PORT` property.
 */
declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      DATABASE_URL: string;
      JWT_SECRET: Secret;
      NODE_ENV: "development" | "production";
      REDIS_URL: string;
      REDIS_URL: string;
    }
  }
}
