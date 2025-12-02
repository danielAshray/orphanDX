import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma";
import { compareHashPassword, getHashPassword } from "../utils/bcryptService";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../config/app.config";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

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

export { getProfile, registerUser, loginUser };
