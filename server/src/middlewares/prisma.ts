import { PrismaClient } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

/**
 * Middleware that attaches a PrismaClient instance to the request object.
 * @param prisma - The PrismaClient instance.
 * @returns The middleware function.
 */
function PrismaMiddleware(req: Request, res: Response, next: NextFunction) {
  req.prisma = prisma;
  next();
}

/**
 * Function that closes the PrismaClient instance.
 */
export function closePrisma() {
  prisma.$disconnect();
}

export default PrismaMiddleware;
