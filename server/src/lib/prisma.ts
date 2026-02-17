import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Avoid multiple instances in development
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["error", "warn"],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

// Reset Prisma connection on startup to clear prepared statement cache from pooler
if (process.env.NODE_ENV === "development") {
  (async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      await prisma.$disconnect();
      console.log("[Prisma] Disconnected to clear pooler cache");
      await new Promise((resolve) => setTimeout(resolve, 100));
      await prisma.$connect();
      console.log("[Prisma] Reconnected successfully");
    } catch (err) {
      console.error("[Prisma] Failed to reset connection on startup:", err);
    }
  })();
}