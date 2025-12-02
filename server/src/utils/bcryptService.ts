import bcrypt from "bcryptjs";
import { SALT_ROUNDS } from "../config/app.config";

const getHashPassword = (password: string): string => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
};
const compareHashPassword = (password: string, hash: string): boolean => {
  return bcrypt.compareSync(password, hash);
};

export { getHashPassword, compareHashPassword };
