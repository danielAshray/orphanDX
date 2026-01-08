import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { sendResponse } from "../utils/responseService";
import { ApiError } from "../utils/apiService";

const fetchTests = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tests = await prisma.labTest.findMany();

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Tests fetched successfully",
      data: tests,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error));
  }
};

export { fetchTests };
