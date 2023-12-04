import type { Request, Response } from "express";

export const ListAccountsController = async (req: Request, res: Response) => {
  const accounts = await req.prisma.accounts.findMany({
    where: {
      user_id: req.user?.id,
    },
  });

  return res.status(200).json(accounts);
};

export const GetAccountsController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const accounts = await req.prisma.accounts.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!accounts) {
    return res.status(404).json({
      error: "Account not found",
    });
  }

  if (accounts.user_id !== req.user?.id) {
    return res.status(403).json({
      error: "Forbidden",
    });
  }

  return res.status(200).json(accounts);
};

export const CreateAccountsController = async (
  req: Request<null, null, { label: string }>,
  res: Response
) => {
  const { label } = req.body;

  const accounts = await req.prisma.accounts.create({
    data: {
      label,
      User: {
        connect: {
          id: req.user?.id,
        },
      },
    },
  });

  return res.status(201).json(accounts);
};
