import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { AppConfig } from "../config/app.config";
import ErrorHandlers from "../middleware/errorHandlers.middleware";
import mainRoute from "../routes";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.errorHandling();
  }

  private middlewares(): void {
    this.app.use(cors({ origin: AppConfig.CLIENT_URL }));
    this.app.use(helmet());
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.text({ type: "text/xml" }));
  }

  private routes(): void {
    if (!AppConfig.BASE_API_PATH) {
      const message: string = "BASE_API_PATH is not defined";
      logger.error(message);
      throw ApiError.internal(message);
    }
    this.app.use(AppConfig.BASE_API_PATH, mainRoute);
  }

  private errorHandling(): void {
    this.app.use(ErrorHandlers.notFoundHandler);
    this.app.use(ErrorHandlers.errorHandler);
  }
}

export default new App().app;
