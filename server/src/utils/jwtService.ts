import jwt, { SignOptions } from "jsonwebtoken";
import AppConfig from "../config/app.config";
import { CustomJwtPayload } from "../types/express";

const generateToken = (payload: object): string => {
  const options: SignOptions = {
    expiresIn: AppConfig.TOKEN_EXPIRE_AT as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, AppConfig.TOKEN_SECRET_KEY, options);
};
const verifyToken = (token: string): CustomJwtPayload => {
  return jwt.verify(token, AppConfig.TOKEN_SECRET_KEY) as CustomJwtPayload;
};

export { generateToken, verifyToken };
