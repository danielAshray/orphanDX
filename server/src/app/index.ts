import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import AppConfig from "../config/app.config";
import mainRoute from "../routes";
import {
  globalErrorHandler,
  notFoundHandler,
} from "../middleware/error.middleware";
import { globalLimiter } from "../middleware/limit.middleware";

const App = Object.freeze({
  SET: "trust proxy",
  LIMIT: "50mb",
  TYPE: "text/xml",
  PATH: "../../ui/dist",
  INDEX: "index.html",
});

const app: Application = express();

app.set(App.SET, 1);
app.use(globalLimiter);

app.use(cors({ origin: AppConfig.CLIENT_URL }));
app.use(helmet());

app.use(express.json({ limit: App.LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: App.TYPE }));

app.use(AppConfig.BASE_API_PATH, mainRoute);

const frontendPath = path.join(__dirname, App.PATH);
app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(frontendPath, App.INDEX));
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
