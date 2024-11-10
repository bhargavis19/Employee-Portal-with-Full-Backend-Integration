import { PrismaClient } from "@prisma/client";

export default class DbClient {
  public readonly prisma = new PrismaClient();
}
