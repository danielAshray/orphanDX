import bcrypt from "bcryptjs";
import AppConfig from "../config/app.config";

const hashPassword = (password: string): string => {
  return bcrypt.hashSync(password, AppConfig.SALT_ROUNDS);
};
const comparePassword = (password: string, hashed: string): boolean => {
  return bcrypt.compareSync(password, hashed);
};

export { hashPassword, comparePassword };
