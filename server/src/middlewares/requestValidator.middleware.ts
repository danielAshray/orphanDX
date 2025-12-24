import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ApiError } from "../utils/apiService";

const validateQuery = (schema: Schema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      allowUnknown: false,
    });

    if (error) {
      const message = error.details.map((d) => d.message).join(", ");
      return next(ApiError.badRequest(message));
    }

    req.query = value;
    next();
  };
};

const validateBody = (schema: Schema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((d) => d.message).join(", ");
      return next(ApiError.badRequest(message));
    }

    req.body = value;
    next();
  };
};

export { validateQuery, validateBody };
