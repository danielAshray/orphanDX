import { JwtPayload } from "jsonwebtoken";
import { OrganizationRole, UserRole } from "@prisma/client";

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  organization?: {
    id: string;
    role: OrganizationRole;
  };
}

declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}
