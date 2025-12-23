import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { sendResponse } from "../utils/responseService";
import { ApiError } from "../utils/apiService";

export const fetchPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id;
    const patients = await prisma.patient.findMany({
      where: {
        facilityId: organizationId,
        labRecommendations: { some: {} },
      },
      include: {
        insurance: true,
        diagnosis: true,
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

export const fetchPatientDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id;

    const patient = await prisma.patient.findUnique({
      where: {
        facilityId: organizationId,
        id: req.params.id,
      },
      include: {
        labRecommendations: {
          include: {
            labRule: { select: { lab: { select: { name: true, id: true } } } },
          },
        },
        labOrder: { include: { testResult: true } },
      },
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Patient fetched successfully",
      data: patient,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error));
  }
};
