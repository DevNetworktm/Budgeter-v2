import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import { DecodeToken } from "../utils/jwt";

/**
 * Middleware function to check if the user is authenticated.
 * It decodes the JWT token from the request cookies, retrieves the user information from Redis,
 * and attaches the user object to the request object.
 * If the token is invalid or the user does not exist, it returns a 401 Unauthorized response.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
async function IsAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const playload: JwtPayload = DecodeToken(req.cookies.token) as JwtPayload;
    const user = JSON.parse((await req.redis.get(playload.id)) as string);
    if (!user) throw new Error("Invalid token");
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
}

export default IsAuth;
