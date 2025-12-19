import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import { comparePassword, hashPassword } from "../utils/bcryptService";
import { generateToken } from "../utils/jwtService";
import { generateRandomString } from "../utils";
import dayjs from "dayjs";
import { sendResponse } from "../utils/responseService";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });

    if (!userExists) {
      const message = "User not found";
      return next(ApiError.notFound(message));
    }

    const matchPassword = comparePassword(password, userExists.password);

    if (!matchPassword) {
      const message = "Invalid credentials";
      return next(ApiError.unauthorized(message));
    }

    const tokenPayload = {
      id: userExists.id,
      role: userExists.role,
      email: userExists.email,
    };

    const accessToken = generateToken(tokenPayload);

    const refreshToken = generateRandomString(200);
    const maskedAccessToken = generateRandomString(150);

    const now = new Date();
    const accessExpiresAt = dayjs().add(1, "hour").toDate();
    const refreshExpiresAt = dayjs().add(30, "day").toDate();

    await prisma.auth.create({
      data: {
        userId: userExists.id,
        accessToken,
        refreshToken,
        maskedAccessToken,
        accessExpiresAt,
        refreshExpiresAt,
      },
    });

    await prisma.auth.deleteMany({
      where: {
        userId: userExists.id,
        OR: [
          { accessExpiresAt: { lt: now } },
          { refreshExpiresAt: { lt: now } },
        ],
      },
    });

    const { password: _, ...safeUser } = userExists;

    sendResponse(res, {
      success: true,
      code: 200,
      message: "User logged in successfully",
      data: {
        // refreshToken,
        token: maskedAccessToken,
        role: userExists.role,
        user: { ...safeUser },
      },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    const authExists = await prisma.auth.findUnique({
      where: { refreshToken },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
      },
    });

    if (!authExists) {
      const message = "Invalid refresh token";
      return next(ApiError.notFound(message));
    }

    const tokenPayload = {
      id: authExists.user.id,
      role: authExists.user.role,
      email: authExists.user.email,
    };

    const newAccessToken = generateToken(tokenPayload);
    const newMaskedAccessToken = generateRandomString(150);

    const authPayload = {
      accessToken: newAccessToken,
      maskedAccessToken: newMaskedAccessToken,
    };

    await prisma.auth.update({
      where: { id: authExists.id },
      data: authPayload,
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Token refreshed successfully",
      data: { maskedAccessToken: newMaskedAccessToken },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      const message = "User already exists";
      return next(ApiError.notFound(message));
    }

    const hashedPassword = hashPassword(password);

    const userPayload = {
      name,
      email,
      password: hashedPassword,
      role: role,
    };

    const newUser = await prisma.user.create({
      data: userPayload,
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

export { loginUser, refreshToken, registerUser };
