import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { sendResponse } from "../utils/responseService";
import { ApiError } from "../utils/apiService";

const fetchTests = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const uniqueTests = await prisma.labTest.findMany({
      distinct: ["testName", "cptCode"],
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Tests fetched successfully",
      data: uniqueTests,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error));
  }
};

export { fetchTests };
