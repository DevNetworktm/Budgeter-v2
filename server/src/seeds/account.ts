// Import
import type { Accounts, PrismaClient, Users } from "@prisma/client";

export async function AccountSeed(
  prisma: PrismaClient,
  user: Users,
  label: string
) {
  const account: Accounts = await prisma.accounts.create({
    data: {
      label,
      User: {
        connect: user,
      },
    },
  });

  return account;
}
