import { OrganizationRole, UserRole } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiService";
import { verifyToken } from "../utils/jwtService";

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(ApiError.notFound("Token missing"));
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (error: any) {
    return next(ApiError.unauthorized("Invalid token"));
  }
};

const authorizeByRoleAndOrg = (
  allowedRoles: UserRole[],
  allowedOrgRole?: OrganizationRole
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(ApiError.unauthorized("Unauthorized"));
    }

    if (!allowedRoles.includes(user.role)) {
      return next(ApiError.forbidden("Forbidden: Access denied"));
    }

    if (allowedOrgRole) {
      if (allowedOrgRole !== user.organization?.role) {
        return next(
          ApiError.forbidden(`Forbidden: Only ${allowedOrgRole} allowed`)
        );
      }
    }

    next();
  };
};

export { authenticate, authorizeByRoleAndOrg };
