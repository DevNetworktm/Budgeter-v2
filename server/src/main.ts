import "dotenv/config";
import express, { type Request, type Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.send({ users });
});

app.get("/api/:email", async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      email: req.params.email,
    },
  });
  res.send({ id: user.id });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
