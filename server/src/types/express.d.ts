import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@prisma/client";

export interface CustomJwtPayload extends JwtPayload {
  id: number;
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
