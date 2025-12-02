import { createLogger, format, transports, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

class AppLogger {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.printf(
          (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
        )
      ),
      transports: [
        new transports.Console(),
        new DailyRotateFile({
          dirname: "logs",
          filename: "app-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          zippedArchive: true,
        }),
      ],
    });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public war(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public getLogger(): Logger {
    return this.logger;
  }
}

export const logger = new AppLogger();
