import { Router } from "express";
import { AuthLoginController } from "../controllers/auth";

const AuthRouter = Router();

AuthRouter.post("/login", AuthLoginController);

export default AuthRouter;
