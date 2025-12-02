import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";

interface ValidationError {
  code: number;
  message: string;
}

class RequestValidator {
  static body(schema: Schema) {
    return (req: Request, _res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const message: ValidationError = {
          code: 400,
          message: error.details[0].message,
        };
        logger.error(`Request body error: ${message.message}`);
        return next(ApiError.badRequest(undefined, message.message));
      }

      req.body = value;
      next();
    };
  }

  static query(schema: Schema) {
    return (req: Request, _res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.query, { allowUnknown: false });

      if (error) {
        const { message } = error.details[0];
        logger.error(`Query params error: ${message}`);
        return next(ApiError.badRequest(undefined, message));
      }

      next();
    };
  }
}

export default RequestValidator;
