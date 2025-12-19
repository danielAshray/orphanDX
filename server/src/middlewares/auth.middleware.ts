import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiService";
import { verifyToken } from "../utils/jwtService";

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(ApiError.notFound("Token missing"));
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    return next(ApiError.unauthorized("Invalid token"));
  }
};

const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      const message = "Unauthorized";
      return next(ApiError.unauthorized(message));
    }

    if (!allowedRoles.includes(user.role)) {
      const message = "Forbidden: Access denied";
      return next(ApiError.forbidden(message));
    }

    next();
  };
};

export { authenticate, authorize };
