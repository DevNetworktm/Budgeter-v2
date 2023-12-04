// Import
import type { PrismaClient } from "@prisma/client";

// Import utils
import { HashPassword } from "../utils/";

/**
 * Function that seeds a user in the database.
 * @param prisma - The Prisma client instance.
 * @returns A Promise that resolves to the seeded user.
 */
export async function UserSeed(prisma: PrismaClient) {
  const user = await prisma.users.create({
    data: {
      email: "admin@gmail.com",
      password: HashPassword("admin"),
      username: "admin",
    },
  });
  return user;
}
