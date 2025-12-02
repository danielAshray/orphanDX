import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";
import { AppConfig } from "../config/app.config";
import JwtService from "../utils/jwtService";
import { UserRoles } from "../constants/userRoles";
import PrismaService from "../db/prismaService";

class Auth {
  static authenticate = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      logger.error("Token missing");
      return next(ApiError.notFound("Token missing"));
    }

    const authExists = await PrismaService.client.auth.findUnique({
      where: { maskedAccessToken: token },
      include: { user: true },
    });

    if (!authExists) {
      const message = "Invalid token";
      logger.error(message);
      return next(ApiError.unauthorized(message));
    }

    try {
      if (!AppConfig.TOKEN_SECRET_KEY) {
        const message: string = "TOKE_SECRET_KEY is not defined";
        logger.error(message);
        return next(ApiError.internal(message));
      }

      // const decoded = JwtService.verifyToken(token);
      const decoded = JwtService.verifyToken(authExists.accessToken);
      req.user = decoded;

      next();
    } catch (error: any) {
      next(ApiError.unauthorized("Invalid token"));
    }
  };

  static authorize = (...allowed: UserRoles[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
      const user = req.body;

      if (!user) {
        const message = "Unauthorized";
        logger.error(message);
        return next(ApiError.unauthorized(message));
      }

      if (!allowed.includes(user.role)) {
        const message = "Forbidden: Access denied";
        return next(ApiError.forbidden(message));
      }

      next();
    };
  };
}

export default Auth;
