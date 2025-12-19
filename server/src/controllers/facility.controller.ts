import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiService";
import { sendResponse } from "../utils/responseService";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/bcryptService";

const registerFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { facility, user } = req.body;

    await prisma.$transaction(async (tx) => {
      const newFacility = await tx.facility.create({
        data: { name: facility.name, email: facility.email },
      });

      const hashedPassword = hashPassword(user.password);

      await tx.user.create({
        data: {
          name: user.name,
          password: hashedPassword,
          email: user.email,
          role: "FACILITY",
          facilityId: newFacility.id,
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

export { registerFacility };
