import { Router } from "express";
import { UsersMeController } from "../controllers/users";

const UsersRouter = Router();

UsersRouter.get("/me", UsersMeController);
UsersRouter.post("/create");
UsersRouter.delete("/");
UsersRouter.delete("/:id");

export default UsersRouter;
