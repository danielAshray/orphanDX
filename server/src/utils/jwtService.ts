import jwt, { SignOptions } from "jsonwebtoken";
import { AppConfig } from "../config/app.config";
import { ApiError } from "./apiError";
import { logger } from "./logger";
import { CustomJwtPayload } from "../types/express";

class JwtService {
  private static secret: string = (() => {
    if (!AppConfig.TOKEN_SECRET_KEY) {
      const message = "TOKEN_SECRET_KEY is not defined";
      logger.error(message);
      throw ApiError.internal(message);
    }
    return AppConfig.TOKEN_SECRET_KEY;
  })();

  private static expiresIn: string | number = (() => {
    if (!AppConfig.TOKEN_EXPIRE_AT) {
      const message = "TOKEN_EXPIRE_AT is not defined";
      logger.error(message);
      throw ApiError.internal(message);
    }
    return AppConfig.TOKEN_EXPIRE_AT as string;
  })();

  static generateToken(payload: object): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn as SignOptions["expiresIn"],
    };
    return jwt.sign(payload, this.secret, options);
  }

  static verifyToken(token: string): CustomJwtPayload {
    try {
      return jwt.verify(token, this.secret) as CustomJwtPayload;
    } catch (error: any) {
      logger.error(`JWT verification failed: ${error.message}`);
      throw ApiError.unauthorized("Invalid or expired token");
    }
  }
}

export default JwtService;
