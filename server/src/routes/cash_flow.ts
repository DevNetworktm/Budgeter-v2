import { Router } from "express";

const CashFlowRouter = Router();

CashFlowRouter.get("/");
CashFlowRouter.get("/:account_id");
CashFlowRouter.get("/:account_id/:category_id");
CashFlowRouter.get("/:category_id");
CashFlowRouter.post("/");
CashFlowRouter.put("/:id");
CashFlowRouter.delete("/:id");

export default CashFlowRouter;
