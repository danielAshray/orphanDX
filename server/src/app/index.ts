import express, { type Application } from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import AppConfig from "../config/app.config";
import mainRoute from "../routes";
import {
  globalErrorHandler,
  notFoundHandler,
} from "../middlewares/error.middleware";
import { globalLimiter } from "../middlewares/limit.middleware";

const App = Object.freeze({
  SET: "trust proxy",
  LIMIT: "50mb",
  TYPE: "text/xml",
  PATH: "../../../ui/dist",
  INDEX: "index.html",
});

const app: Application = express();

app.set(App.SET, 1);
app.use(globalLimiter);

app.use(cors({ origin: AppConfig.CLIENT_URL }));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        frameAncestors: [`${AppConfig.CLIENT_URL}`, `https://app.orphandx.com`],
      },
    },
  })
);

app.use(express.json({ limit: App.LIMIT }));
app.use(express.urlencoded({ extended: true }));
app.use(express.text({ type: App.TYPE }));

app.use(AppConfig.BASE_API_PATH, mainRoute);
app.use(
  AppConfig.BASE_SERVE_PATH,
  express.static(path.join(__dirname, "../uploads/results"))
);

const frontendPath = path.join(__dirname, App.PATH);
app.use(express.static(frontendPath));

app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(frontendPath, App.INDEX));
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
