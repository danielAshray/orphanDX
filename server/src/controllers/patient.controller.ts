import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { sendResponse } from "../utils/responseService";
import { ApiError } from "../utils/apiService";

export const fetchPatientDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id;
    const patients = await prisma.patient.findMany({
      where: {
        facilityId: organizationId,
      },
      include: {
        insurance: true,
        diagnoses: true,
        labRecommendations: true,
        labOrder: true,
      },
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Patients fetched successfully",
      data: patients,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error));
  }
};
