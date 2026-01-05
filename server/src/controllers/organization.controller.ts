import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiService";
import { sendResponse } from "../utils/responseService";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/bcryptService";

const registerOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { organization, user } = req.body;

    await prisma.$transaction(async (tx) => {
      const newOrganization = await tx.organization.create({
        data: organization,
      });

      const hashedPassword = hashPassword(user.password);

      await tx.user.create({
        data: {
          name: user.name,
          password: hashedPassword,
          email: user.email,
          role: "ADMIN",
          organizationId: newOrganization.id,
        },
      });
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "User created successfully",
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const getLabs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const labs = await prisma.organization.findMany({
      where: {
        role: "LAB",
      },
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Labs fetched successfully",
      data: labs,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

export { registerOrganization, getLabs };
