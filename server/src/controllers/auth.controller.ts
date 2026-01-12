import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import { comparePassword, hashPassword } from "../utils/bcryptService";
import { generateToken } from "../utils/jwtService";
import { sendResponse } from "../utils/responseService";

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
      include: { organization: { select: { id: true, role: true } } },
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
      organization: {
        id: userExists.organizationId,
        role: userExists.organization?.role,
      },
    };

    const token = generateToken(tokenPayload);

    sendResponse(res, {
      success: true,
      code: 200,
      message: "User logged in successfully",
      data: {
        token,
        orgRole: !userExists.organization
          ? userExists.role
          : userExists.organization.role,
        user: {
          name: userExists.name,
          role: userExists.role,
          id: userExists.id,
          ...(userExists.organization
            ? { organization: tokenPayload.organization }
            : {}),
        },
      },
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

    const newUser = await prisma.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
        role,
      },
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

const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userId = req.user?.id;

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      const message = "User not found";
      return next(ApiError.notFound(message));
    }

    const matchPassword = comparePassword(oldPassword, userExists.password);

    if (!matchPassword) {
      const message = "Old password is incorrect";
      return next(ApiError.unauthorized(message));
    }

    const hashedPassword = hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Password changed successfully",
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    const { name, email, phone } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      const message = "User not found";
      return next(ApiError.notFound(message));
    }

    if (email && email !== userExists.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });

      if (emailExists) {
        const messsage = "Email already in use";
        return next(ApiError.conflict(messsage));
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        organization: {
          update: {
            phone: phone,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        organization: {
          select: {
            phone: true,
          },
        },
      },
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

export { loginUser, registerUser, changePassword, updateProfile };
