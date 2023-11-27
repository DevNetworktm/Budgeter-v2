import "dotenv/config";
import express, { type Request, type Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/users/", async (req: Request, res: Response) => {
  const users = await prisma.users.findMany({
    include: {
      Account: true,
      Categories: true,
    },
  });
  res.send({ users });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
