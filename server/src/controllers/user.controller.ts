import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { comparePassword } from "../utils/bcryptService";
import jwt from "jsonwebtoken";
import AppConfig from "../config/app.config";
import crypto from "crypto";
import { ApiError } from "../utils/apiService";

import { sendResponse } from "../utils/responseService";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;

    const userExists = await prisma.user.findUnique({
      where: { id: user?.id },
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

    if (!userExists) {
      const message = "User not found";
      return next(ApiError.notFound(message));
    }

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Profile fetched successfully",
      data: { ...userExists, phone: userExists.organization?.phone },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const practiceFusionLogin = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
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
      return res.status(404).json({
        success: false,
        message: "User not found",
        user: null,
      });
    }

    const matchPassword = comparePassword(password, userExists.password);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        user: null,
      });
    }

    const token = jwt.sign(
      { id: userExists.id, role: userExists.role, email: userExists.email },
      AppConfig.PF_JWT_SECRET,
      { expiresIn: "10m" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: userExists.id,
        email: userExists.email,
        name: userExists.name,
        role: userExists.role,
      },
      token,
    });
  } catch (error: any) {
    const message = error.message || "Internal server error";
    return res.status(500).json({
      success: false,
      message,
      user: null,
    });
  }
};

interface PfTokenPayload {
  id: string;
  role: string;
  email: string;
}

const practiceFusionCallback = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { practiceId, token } = req.query;

    const decoded = jwt.verify(
      token as string,
      AppConfig.PF_JWT_SECRET
    ) as PfTokenPayload;

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      const msg = "User not found";
      return res.status(404).json({
        success: false,
        message: msg,
        practiceId: practiceId as string,
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token as string)
      .digest("hex");
    await prisma.practiceConnection.upsert({
      where: { practiceId: practiceId as string },
      update: {
        userId: decoded.id,
        token: hashedToken,
        updatedAt: new Date(),
      },
      create: {
        practiceId: practiceId as string,
        userId: decoded.id,
        token: hashedToken,
      },
    });

    if (req.headers.accept?.includes("text/html")) {
      return res.redirect("https://app.orphandx.com");
    } else {
      return res.json({
        success: true,
        message: "Practice Fusion connected",
        practiceId,
      });
    }
  } catch (error: any) {
    const message = error.message || "Internal server error";
    return res.status(500).json({
      success: false,
      message,
      practiceId: req.query.practiceId || null,
    });
  }
};

export { getProfile, practiceFusionLogin, practiceFusionCallback };
