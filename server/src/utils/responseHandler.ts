import { Response } from "express";

class ResponseHandler {
  static send(
    res: Response,
    options: {
      success?: boolean;
      code?: number;
      message: string;
      data?: any;
      detail?: any;
    }
  ) {
    const { success = true, code = 200, message, data, detail } = options;

    return res.status(code).json({
      status: success ? "success" : "error",
      code,
      message,
      data: success ? data ?? null : undefined,
      detail: !success ? detail ?? null : undefined,
    });
  }
}

export default ResponseHandler;
