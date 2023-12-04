// Import environment variables
import "dotenv/config";
import crypto from "crypto";

import jwt, { Secret } from "jsonwebtoken";
import { Users } from "@prisma/client";

const secret: Secret =
  process.env.JWT_SECRET || crypto.randomBytes(64).toString("hex");

export function GenToken(user: Users) {
  return jwt.sign({ id: user.id }, secret, {
    expiresIn: "1h",
  });
}

export function DecodeToken(token: string) {
  return jwt.verify(token, secret);
}
