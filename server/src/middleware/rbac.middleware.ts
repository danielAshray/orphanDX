import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { logger } from "../utils/logger";
import { UserRole } from "../generated/prisma/enums";
import PrismaService from "../db/prismaService";
import { Resource, Action } from "../types/enums/rbacEnums";

class RBAC {
  static userPermission(resource: Resource, action: Action) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      try {
        const { user } = req;
        if (!user) {
          const message = "Unauthorized";
          logger.error(message);
          return next(ApiError.unauthorized(message));
        }

        if (user.role?.name === UserRole.ADMIN) return next();

        const rolePermission =
          await PrismaService.client.rolePermission.findFirst({
            where: {
              roleId: user.role?.id,
              permission: { resource, action },
            },
            include: { permission: true },
          });

        if (!rolePermission) {
          const message = "Forbidden: insufficient permissions";
          logger.error(message);
          return next(ApiError.forbidden(message));
        }

        next();
      } catch (error: any) {
        next(ApiError.internal(undefined, error.message));
      }
    };
  }
}

export default RBAC;
