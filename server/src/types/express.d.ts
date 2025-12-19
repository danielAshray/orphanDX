import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
