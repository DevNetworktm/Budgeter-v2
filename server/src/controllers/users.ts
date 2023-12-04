import type { Request, Response } from "express";
import cache from "../utils/cache";
import { Users } from "@prisma/client";

export const UsersMeController = async (
  req: Request<null, null, null, { all: boolean }>,
  res: Response
) => {
  const { all } = req.query;

  if (all) {
    async function getUserALL() {
      const user = await req.prisma.users.findUnique({
        where: {
          id: req.user?.id,
        },
        include: {
          Account: {
            include: {
              CashFlow: {
                include: {
                  Categorie: true,
                },
              },
              Categories: true,
            },
          },
          Categories: true,
        },
      });
      return { ...user, password: undefined };
    }

    const user: Users = await cache(`${req.user?.id}_all`, getUserALL, {
      redis: req.redis,
      redisExpire: 2,
    });

    return res.status(200).json(user);
  }
  return res.status(200).json(req.user);
};
