import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { CLIENT_URL, PORT } from "./config/app.config";
import mainRoute from "./routes";
import {
  globalErrorHandler,
  notFoundHandler,
} from "./middleware/error.middleware";

const main = async () => {
  try {
    const app = express();
    app.use(cors({ origin: CLIENT_URL }));
    app.use(helmet());
    app.use(express.json({ limit: "50mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.text({ type: "text/xml" }));

    app.use("/api", mainRoute);

    app.use(notFoundHandler);
    app.use(globalErrorHandler);

    app.listen(PORT, () => {
      console.info(`Server running on port ${PORT}`);
    });

    process.on("SIGINT", async () => {
      process.exit(0);
    });
  } catch (error: any) {
    console.error(`Server failed to start: ${error}`);
    process.exit(1);
  }
};
main();
