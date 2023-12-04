import { Router } from "express";

const CategoriesRouter = Router();

CategoriesRouter.get("/");
CategoriesRouter.get("/:id");
CategoriesRouter.post("/");
CategoriesRouter.put("/:id/connect");
CategoriesRouter.put("/:id");
CategoriesRouter.delete("/:id");

export default CategoriesRouter;
