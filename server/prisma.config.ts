import "dotenv/config";
import { defineConfig, env } from "prisma/config";

class PrismaConfig {
  private static _config = defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
      path: "prisma/migrations",
      seed: "tsx prisma/seed.ts",
    },
    datasource: {
      url: env("DATABASE_URL"),
    },
  });

  public static get config() {
    return this._config;
  }
}

export default PrismaConfig.config;
