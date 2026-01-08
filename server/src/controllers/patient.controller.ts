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
      },
      include: {
        insurance: true,
        diagnosis: true,
        labOrder: true,
        labRecommendations: {
          include: {
            labRule: {
              include: {
                lab: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
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
            labRule: { select: { labId: true, lab: { select: { name: true, id: true } } } },
          },
        },
        labOrder: { include: { tests: true } },
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
