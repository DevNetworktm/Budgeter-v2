import { Router } from "express";
import { IsSetupController, SetupController } from "../controllers";

const IndexRouter = Router();

IndexRouter.get("/setup", IsSetupController);
IndexRouter.post("/setup", SetupController);

export default IndexRouter;
