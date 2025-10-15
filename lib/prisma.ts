import { PrismaClient } from "./generated/prisma";

// Ensure a single PrismaClient instance across hot reloads in dev
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Disconnect on process termination
if (process.env.NODE_ENV === "development") {
  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
  });
  process.on("SIGINT", async () => {
    await prisma.$disconnect();
  });
}
