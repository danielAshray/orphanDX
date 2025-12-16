import { Request, Response, NextFunction } from "express";

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  next({ code: 404, message: "resource not found", data: null });
};

export const globalErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let errorCode = 500;

  if (typeof error.code === "number" && error.code >= 100 && error.code < 600) {
    errorCode = error.code;
  }

  const errorMessage =
    typeof error.message === "string"
      ? error.message
      : "An unexpected error occurred";

  res.status(errorCode).json({
    status: false,
    message: errorMessage,
    data: null,
  });
};
