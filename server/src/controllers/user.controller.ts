import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { compareHashPassword, getHashPassword } from "../utils/bcryptService";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../config/app.config";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import crypto from "crypto";

const getProfile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userExists = await prisma.user.findUnique({
      where: { id: req.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    if (!userExists) {
      return next({ code: 400, message: "user not found" });
    }

    if (userExists.status !== "ACTIVE") {
      return next({ code: 400, message: "user not active" });
    }

    return res.status(200).send(userExists);
  } catch (error) {
    next(error);
  }
};

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
        status: true,
      },
    });

    if (!userExists) {
      return next({ code: 400, message: "User not found" });
    }

    const matchPassword = compareHashPassword(password, userExists.password);

    if (!matchPassword) {
      return next({ code: 400, message: "Invalid credentials" });
    }

    const payload = {
      token: jwt.sign(
        { id: userExists.id, role: userExists.role },
        TOKEN_SECRET_KEY,
        { expiresIn: "1d" }
      ),
      email: userExists.email,
    };
    return res.status(200).json(payload);
  } catch (error) {
    next(error);
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
      return next({ code: 400, message: "User already exists" });
    }

    const hashPassword = getHashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        role,
      },
    });

    return res.status(200).json(newUser);
  } catch (error) {
    next(error);
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
        status: true,
      },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        user: null,
      });
    }

    const matchPassword = compareHashPassword(password, userExists.password);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
        user: null,
      });
    }

    const token = jwt.sign(
      { id: userExists.id, role: userExists.role, email: userExists.email },
      TOKEN_SECRET_KEY,
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
  id: number;
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
      TOKEN_SECRET_KEY
    ) as PfTokenPayload;

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      const msg = "User not found";
      if (req.headers.accept?.includes("text/html")) {
        return res.redirect(
          `https://app.orphandx.com/error?message=${encodeURIComponent(msg)}`
        );
      }
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

export {
  getProfile,
  registerUser,
  loginUser,
  practiceFusionLogin,
  practiceFusionCallback,
};
