import type { Request, Response } from "express";
import type { PrismaClient, Settings } from "@prisma/client";

import cache from "../utils/cache";
import { HashPassword } from "../utils";

function getSettings(prisma: PrismaClient) {
  return async () =>
    await prisma.settings.findUnique({
      where: {
        id: 1,
      },
    });
}

function setSettings(prisma: PrismaClient, settings: Settings) {
  return async () =>
    await prisma.settings.create({
      data: settings,
    });
}

export const IsSetupController = async (req: Request, res: Response) => {
  const settings = await cache("settings", getSettings(req.prisma), {
    redis: req.redis,
    redisExpire: 60,
  });

  if (settings) {
    return res.status(200).json({
      setup: true,
      settings: { ...settings, id: undefined },
    });
  }

  return res.status(404).json({
    setup: false,
  });
};

export const SetupController = async (
  req: Request<
    null,
    {
      currency: string;
      language: string;
      dark_mode: boolean;
      user: {
        email: string;
        username: string;
        password: string;
      };
    }
  >,
  res: Response
) => {
  const { currency, language, dark_mode, user } = req.body;
  let settings = await cache("settings", getSettings(req.prisma), {
    redis: req.redis,
    redisExpire: 60,
  });

  if (settings) {
    return res.status(400).json({
      error: "Already setup",
    });
  }

  settings = await cache(
    "settings",
    setSettings(req.prisma, { currency, language, dark_mode, id: 1 }),
    {
      redis: req.redis,
      redisExpire: 60,
    }
  );

  if (!settings) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }

  await req.prisma.users.create({
    data: { ...user, password: HashPassword(user.password), admin: true },
  });

  return res.status(201).json({
    message: "Setup successful",
  });
};
