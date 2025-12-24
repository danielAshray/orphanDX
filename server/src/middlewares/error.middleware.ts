import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/responseService";

const notFoundHandler = (_req: Request, res: Response, _next: NextFunction) => {
  sendResponse(res, {
    success: false,
    code: 404,
    message: "Resource not found",
    data: null,
  });
};

const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const isKnown = err && typeof err.code === "number";

  const code = isKnown ? err.code : 500;
  const message = isKnown ? err.message : "Internal server error";
  const detail = isKnown ? err.detail : null;

  sendResponse(res, { success: false, code, message, detail });
};

export { notFoundHandler, globalErrorHandler };
