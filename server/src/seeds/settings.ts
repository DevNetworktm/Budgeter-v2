// Import
import type { Settings, PrismaClient } from "@prisma/client";

export async function SettingsSeed(prisma: PrismaClient) {
  const settings: Settings = await prisma.settings.create({
    data: {
      id: 1,
      currency: "€",
      language: "fr",
      dark_mode: true,
    },
  });

  return settings;
}
