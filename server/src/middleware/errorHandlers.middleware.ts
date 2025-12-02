import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";
import ResponseHandler from "../utils/responseHandler";

class ErrorHandlers {
  static errorHandler = (
    err: any,
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const isKnown = err instanceof ApiError;

    const code = isKnown ? err.code : 500;
    const message = isKnown ? err.message : "Internal server error";
    const detail = isKnown ? err.detail : null;

    logger.error(
      `[${req.method}] ${req.url} -> ${message}${
        detail ? " | Detail: " + JSON.stringify(detail) : ""
      }`
    );

    ResponseHandler.send(res, { success: false, code, message, detail });
  };

  static notFoundHandler = (
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    ResponseHandler.send(res, {
      success: false,
      code: 404,
      message: "Resource not found",
      data: null,
    });
  };
}

export default ErrorHandlers;
