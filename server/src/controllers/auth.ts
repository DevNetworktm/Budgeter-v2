import type { Request, Response } from "express";

import { ComparePassword } from "../utils/";
import { GenToken } from "../utils/jwt";

export const AuthLoginController = async (
  req: Request<any, any, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await req.prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }

  if (!ComparePassword(password, user.password)) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }

  // add token to cookie
  res.cookie("token", GenToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // add user to redis
  req.redis.set(user.id, JSON.stringify({ ...user, password: undefined }), {
    EX: 3600,
  });

  return res.status(200).json({
    message: "Login successful",
  });
};
