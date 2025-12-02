import { configDotenv } from "dotenv";
configDotenv();

import { AppConfig } from "./config/app.config";
import app from "./app";
import { logger } from "./utils/logger";
import PrismaService from "./db/prismaService";

class Server {
  private port: number;

  constructor(port: number) {
    this.port = port;
  }

  public async start(): Promise<void> {
    try {
      await PrismaService.connect();

      app.listen(this.port, () => {
        logger.info(`Server running on port ${this.port}`);
      });

      process.on("SIGINT", async () => {
        await PrismaService.disconnect();
        process.exit(0);
      });
    } catch (error: any) {
      logger.error(`Server failed to start: ${error}`);
      process.exit(1);
    }
  }
}

new Server(AppConfig.PORT).start();
