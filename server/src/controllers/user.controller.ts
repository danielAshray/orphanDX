import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import BcryptService from "../utils/bcryptService";
import { logger } from "../utils/logger";
import JwtService from "../utils/jwtService";
import Utilities from "../utils";
import dayjs from "dayjs";
import { Status } from "../generated/prisma/enums";

class UserController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req;

      const userExists = await PrismaService.client.user.findUnique({
        where: { id: user?.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: { select: { id: true, name: true } },
          status: true,
        },
      });

      if (!userExists) {
        const message = "User not found";
        logger.error(message);
        return next(ApiError.notFound(message));
      }

      if (userExists.status !== Status.ACTIVE) {
        const message = "User not active";
        logger.error(message);
        return next(ApiError.forbidden(message));
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "User fetched successfully",
        data: userExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      const userExists = await PrismaService.client.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: { select: { id: true, name: true } },
          status: true,
        },
      });

      if (!userExists) {
        const message = "User not found";
        logger.error(message);
        return next(ApiError.notFound(message));
      }

      const matchPassword = BcryptService.comparePassword(
        password,
        userExists.password
      );

      if (!matchPassword) {
        const message = "Invalid credentials";
        logger.error(message);
        return next(ApiError.unauthorized(message));
      }

      const tokenPayload = {
        id: userExists.id,
        role: userExists.role,
        email: userExists.email,
      };

      const accessToken = JwtService.generateToken(tokenPayload);

      const refreshToken = Utilities.generateRandomString(200);
      const maskedAccessToken = Utilities.generateRandomString(150);

      const now = new Date();
      const accessExpiresAt = dayjs().add(1, "hour").toDate();
      const refreshExpiresAt = dayjs().add(30, "day").toDate();

      await PrismaService.client.auth.create({
        data: {
          userId: userExists.id,
          accessToken,
          refreshToken,
          maskedAccessToken,
          accessExpiresAt,
          refreshExpiresAt,
        },
      });

      await PrismaService.client.auth.deleteMany({
        where: {
          userId: userExists.id,
          OR: [
            { accessExpiresAt: { lt: now } },
            { refreshExpiresAt: { lt: now } },
          ],
        },
      });

      const { password: _, ...safeUser } = userExists;

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "User logged in successfully",
        data: { ...safeUser, refreshToken, maskedAccessToken },
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      const authExists = await PrismaService.client.auth.findUnique({
        where: { refreshToken },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              email: true,
              role: { select: { id: true, name: true } },
            },
          },
        },
      });

      if (!authExists) {
        const message = "Invalid refresh token";
        logger.error(message);
        return next(ApiError.notFound(message));
      }

      const tokenPayload = {
        id: authExists.user.id,
        role: authExists.user.role,
        email: authExists.user.email,
      };

      const newAccessToken = JwtService.generateToken(tokenPayload);
      const newMaskedAccessToken = Utilities.generateRandomString(150);

      const authPayload = {
        accessToken: newAccessToken,
        maskedAccessToken: newMaskedAccessToken,
      };

      await PrismaService.client.auth.update({
        where: { id: authExists.id },
        data: authPayload,
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Token refreshed successfully",
        data: { maskedAccessToken: newMaskedAccessToken },
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role } = req.body;

      const userExists = await PrismaService.client.user.findUnique({
        where: { email },
      });

      if (userExists) {
        const message = "User already exists";
        logger.error(message);
        return next(ApiError.notFound(message));
      }

      const roleExists = await PrismaService.client.role.findUnique({
        where: { name: role },
      });

      if (!roleExists) {
        const message = "Role not found";
        logger.error(message);
        return next(ApiError.notFound(message));
      }

      const hashPassword = BcryptService.hashPassword(password);

      const userPayload = {
        name,
        email,
        password: hashPassword,
        roleId: roleExists.id,
      };

      const newUser = await PrismaService.client.user.create({
        data: userPayload,
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default UserController;
