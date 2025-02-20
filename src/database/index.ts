import { PrismaClient } from "@prisma/client";
import { StoreSyncCommand } from "./StoreSyncCommand";

class DatabaseClient {
  constructor(private prisma: PrismaClient) {}

  async syncStores(unknowns: unknown[]) {
    await new StoreSyncCommand(this.prisma).run(unknowns)
  }
}

const prisma = new PrismaClient()
const databaseClient = new DatabaseClient(prisma)
export { databaseClient }