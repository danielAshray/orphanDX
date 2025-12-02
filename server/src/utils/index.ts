import crypto from "crypto";

class Utilities {
  static generateRandomString(length: number) {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
  }
}

export default Utilities;
