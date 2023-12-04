// Note: This is the entry point of the server.
// Programmer: Zachary Masson

// Import
import express from "express";
import cookieParser from "cookie-parser";

// Import middlewares
import PrismaMiddleware from "./middlewares/prisma";
import RedisMiddleware from "./middlewares/redis";

// Import routes
import IndexRouter from "./routes";
import AuthRouter from "./routes/auth";
import UsersRouter from "./routes/users";

import IsAuth from "./middlewares/auth";

// Import utils
import { addDocumentation } from "./utils/docs";
import AccountsRouter from "./routes/accounts";

// Initialize the app and PrismaClient
const app = express();

// Remove the x-powered-by header
app.disable("x-powered-by");

// Add swagger documentation
addDocumentation(app);

// Apply Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(PrismaMiddleware);
app.use(RedisMiddleware);

// Apply routes
app.use("/api/auth", AuthRouter);
app.use("/api/users", IsAuth, UsersRouter);
app.use("/api/accounts", IsAuth, AccountsRouter);
app.use("/api/", IndexRouter);

export default app;
