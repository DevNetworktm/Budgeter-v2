// Import
import type {
  Accounts,
  CashFlowType,
  Categories,
  PrismaClient,
  Users,
} from "@prisma/client";

export async function CashFlowSeed(
  prisma: PrismaClient,
  account: Accounts,
  categorie: Categories,
  label: string,
  amount: number,
  type: CashFlowType
) {
  const cashFlow = await prisma.cashFlow.create({
    data: {
      label,
      amount,
      type,
      Accounts: {
        connect: account,
      },
      Categorie: {
        connect: categorie,
      },
      date: new Date(),
    },
  });
  return cashFlow;
}
