import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { sendResponse } from "../utils/responseService";
import { ApiError } from "../utils/apiService";

export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      mrn,
      dateOfBirth,
      gender,
      phone,
      email,
      insurance,
      facilityId,
      providerId,
    } = req.body;

    const patient = await prisma.$transaction(async (tx) => {
      const newPatient = await tx.patient.create({
        data: {
          firstName,
          lastName,
          mrn,
          dateOfBirth,
          gender,
          phone,
          email,
          facilityId,
          providerId,
        },
      });

      if (insurance) {
        await tx.insurance.create({
          data: {
            patientId: newPatient.id,
            provider: insurance.provider,
            plan: insurance.plan,
          },
        });
      }

      return newPatient;
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Patient created successfully",
      data: patient,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error));
  }
};

export const fetchPatientDetails = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patients = await prisma.patient.findMany();

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
