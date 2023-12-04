import { CashFlowType, PrismaClient } from "@prisma/client";
import { UserSeed } from "./user";
import { AccountSeed } from "./account";
import { CategorieSeed } from "./categorie";
import { CashFlowSeed } from "./cash_flow";
import { SettingsSeed } from "./settings";

/**
 * Seeds the database with initial data.
 */
async function Seeds() {
  const prisma = new PrismaClient();
  const user = await UserSeed(prisma);
  const account = await AccountSeed(prisma, user, "Current Account");
  const categorie = await CategorieSeed(
    prisma,
    user,
    account,
    "Salary",
    "#000",
    CashFlowType.CASH_IN
  );
  const cashFlow = await CashFlowSeed(
    prisma,
    account,
    categorie,
    "PORTALLIANCE SALARY",
    1550,
    CashFlowType.CASH_IN
  );
  const settings = await SettingsSeed(prisma);
  console.log(user, account, categorie, cashFlow, settings);
}

Seeds();
