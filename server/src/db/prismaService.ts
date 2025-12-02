// src/db/prismaService.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { logger } from "../utils/logger";
import { AppConfig } from "../config/app.config";
import { ApiError } from "../utils/apiError";

class PrismaService {
  private static adapter: PrismaPg;
  private static instance: PrismaClient;

  public static init(): void {
    if (!AppConfig.DATABASE_URL) {
      const message = "DATABASE_URL is not defined";
      logger.error(message);
      throw ApiError.internal(message);
    }

    if (!PrismaService.adapter) {
      PrismaService.adapter = new PrismaPg({
        connectionString: AppConfig.DATABASE_URL,
      });
      logger.info("Prisma adapter initialized");
    }

    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaClient({
        adapter: PrismaService.adapter,
      });
      logger.info("Prisma client initialized (singleton)");
    }
  }

  public static get client(): PrismaClient {
    if (!PrismaService.instance) {
      throw new Error(
        "@prisma/client not initialized yet. Call PrismaService.init() first."
      );
    }
    return PrismaService.instance;
  }

  public static async connect(): Promise<void> {
    try {
      PrismaService.init(); // Ensure client exists
      await PrismaService.client.$connect();
      logger.info("Prisma connected");
    } catch (error: any) {
      const message = error instanceof Error ? error.message : String(error);
      logger.error(`Prisma connection error: ${message}`);
      throw ApiError.internal(message);
    }
  }

  public static async disconnect(): Promise<void> {
    if (PrismaService.instance) {
      await PrismaService.client.$disconnect();
      logger.info("Prisma disconnected");
    }
  }
}

export default PrismaService;
