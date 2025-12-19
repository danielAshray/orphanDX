import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { sendResponse } from "../utils/responseService";
import { ApiError } from "../utils/apiService";

const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const patientExists = await prisma.patient.findFirst({
      where: { id: Number(id) },
    });

    if (!patientExists) {
      const message = "Patient not found";
      return next(ApiError.notFound(message));
    }

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Patient fetched successfully",
      data: patientExists,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const getPatients = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await prisma.patient.findMany({
      select: {
        id: true,
        name: true,
        ehrPatientId: true,
        practiceId: true,
        insurancePlans: {
          select: {
            insurancePlan: {
              select: { provider: { select: { name: true } } },
            },
          },
        },
        dob: true,
        gender: true,
        lastVisit: true,
        orders: {
          select: {
            test: { select: { name: true, id: true } },
            scheduledDate: true,
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
    next(ApiError.internal(undefined, error.message));
  }
};

export { getPatientById, getPatients };
