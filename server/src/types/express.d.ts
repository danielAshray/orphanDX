import { JwtPayload } from "jsonwebtoken";
import { UserRole } from "../generated/prisma/enums";

export interface CustomJwtPayload extends JwtPayload {
  id: number;
  email: string;
  role: {
    id: number;
    name: UserRole;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
