// Import
import type {
  Accounts,
  CashFlowType,
  Categories,
  PrismaClient,
  Users,
} from "@prisma/client";

export async function CategorieSeed(
  prisma: PrismaClient,
  user: Users,
  account: Accounts,
  label: string,
  color: string,
  type: CashFlowType
) {
  const categorie: Categories = await prisma.categories.create({
    data: {
      label,
      color,
      type,
      User: {
        connect: user,
      },
      Accounts: {
        connect: account,
      },
    },
  });

  return categorie;
}
