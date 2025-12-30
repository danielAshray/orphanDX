import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiService";
import { sendResponse } from "../utils/responseService";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../utils/bcryptService";
import fs from "fs";
import path from "path";

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

const uploadPdf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      next(ApiError.internal("Error uploading file"));
    }
    const fileName = "/uploads/results/" + req.file?.filename;
    const user = await prisma.user.findFirst({
      where: { id: req.user!.id },
      include: { organization: { select: { organizationPdf: true } } },
    });
    const prevPdf = user?.organization?.organizationPdf;
    await prisma.organization.update({
      where: { id: user!.organizationId! },
      data: { organizationPdf: fileName },
    });

    if (prevPdf) {
      const filePath = path.join(__dirname, path.join("../", prevPdf));
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting file");
        }
      });
    }

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Organization PDF successfully updated",
    });
  } catch (exception: any) {
    next(ApiError.internal(undefined, exception.message));
  }
};

export { registerOrganization, uploadPdf };
