import app from "./app";
import AppConfig from "./config/app.config";

try {
  const server = app.listen(AppConfig.PORT, () => {
    console.info(`Server running on port ${AppConfig.PORT}`);
  });

  process.on("SIGINT", async () => {
    console.info("SIGINT received. Shutting down...");
    server.close(() => {
      process.exit(0);
    });
  });

  process.on("SIGTERM", async () => {
    console.info("SIGTERM received. Shutting down...");
    server.close(() => {
      process.exit(0);
    });
  });
} catch (error: any) {
  console.error(`Server failed to start: ${error.message}`);
  process.exit(1);
}
