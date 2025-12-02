import bcrypt from "bcryptjs";
import { AppConfig } from "../config/app.config";
import { logger } from "./logger";
import { ApiError } from "./apiError";

class BcryptService {
  static hashPassword = (password: string) => {
    if (!AppConfig.SALT_ROUNDS) {
      const message = "SALT_ROUNDS is not defined";
      logger.error(message);
      throw ApiError.internal(message);
    }
    return bcrypt.hashSync(password, AppConfig.SALT_ROUNDS);
  };

  static comparePassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  };
}

export default BcryptService;
