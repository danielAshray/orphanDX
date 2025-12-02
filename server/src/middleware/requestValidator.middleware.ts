import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

interface ValidationError extends Error {
  code?: number;
}

export const validateReqBody = (schema: Schema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const validationError: ValidationError = new Error(
        error.details.map((d) => d.message).join(", ")
      );
      validationError.code = 400;
      return next(validationError);
    }

    req.body = value;
    next();
  };
};
