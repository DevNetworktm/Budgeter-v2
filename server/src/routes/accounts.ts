import { Router } from "express";
import {
  CreateAccountsController,
  GetAccountsController,
  ListAccountsController,
} from "../controllers/accounts";

const AccountsRouter = Router();

AccountsRouter.get("/", ListAccountsController);
AccountsRouter.get("/:id", GetAccountsController);
AccountsRouter.post("/", CreateAccountsController);
AccountsRouter.put("/:id");
AccountsRouter.delete("/:id");

export default AccountsRouter;
