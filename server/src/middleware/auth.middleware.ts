import { UserRole } from "@prisma/client";
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import AppConfig from "../config/app.config";

interface JwtPayload {
  id: number;
  role: UserRole;
}

interface InitialAuthReq extends Request {
  id?: number;
  role?: UserRole;
}

export interface AuthenticatedRequest extends Request {
  id: number;
  role: UserRole;
}

export const authenticate = (
  req: InitialAuthReq,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided", code: "LOGOUT" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, AppConfig.TOKEN_SECRET_KEY) as JwtPayload;
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid token", code: "LOGOUT" });
  }
};

export const checkPermission =
  (roles: UserRole[]) =>
  (req: InitialAuthReq, res: Response, next: NextFunction) => {
    try {
      if (!req.role) return next({ code: 401, message: "Unauthorized access" });
      const currentRole = req.role;
      if (!roles.includes(currentRole))
        return next({ code: 401, message: "Unauthorized access" });

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };

export const authRoute = (
  handler: (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => Promise<any>
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authReq = req as AuthenticatedRequest;
      if (!authReq.id) return res.status(401).json({ message: "Unauthorized" });
      await handler(authReq, res, next);
    } catch (err) {
      next(err);
    }
  };
};
