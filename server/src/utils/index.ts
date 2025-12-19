import crypto from "crypto";

const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
};

export { generateRandomString };
