import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import { sendResponse } from "../utils/responseService";

const getStatDetails = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [labCount, facilityCount, providerCount] = await Promise.all([
      prisma.organization.count({ where: { role: "LAB" } }),
      prisma.organization.count({ where: { role: "FACILITY" } }),
      prisma.user.count({
        where: { organization: { role: "FACILITY" }, role: "USER" },
      }),
    ]);

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Profile fetched successfully",
      data: {
        labCount,
        facilityCount,
        providerCount,
      },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const getFacilityStatDetails = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [
      patientCount,
      scheduledTestCount,
      completedTestCount,
      recomendedTestCount,
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.labOrder.count({
        where: {
          status: "ORDERED",
        },
      }),
      prisma.labOrder.count({
        where: {
          status: "COMPLETED",
        },
      }),
      prisma.labRecommendation.count({
        where: {
          status: "PENDING",
        },
      }),
    ]);

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Profile fetched successfully",
      data: {
        patientCount,
        scheduledTestCount,
        completedTestCount,
        recomendedTestCount,
      },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

export { getStatDetails, getFacilityStatDetails };
