import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import { logger } from "../utils/logger";

class PatientController {
  async deletePatientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const labExists = await PrismaService.client.lab.findFirst({
        where: { id: Number(id) },
      });

      if (!labExists) {
        const message = "Patient not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Patient deleted successfully",
        data: labExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getPatientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const patientExists = await PrismaService.client.patient.findFirst({
        where: { id: Number(id) },
      });

      if (!patientExists) {
        const message = "Patient not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Patient fetched successfully",
        data: patientExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getPatients(_req: Request, res: Response, next: NextFunction) {
    try {
      const labs = await PrismaService.client.patient.findMany({
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

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Patients fetched successfully",
        data: labs,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { practiceId } = req.body;

      const practiceExists = await PrismaService.client.practice.findFirst({
        where: { id: Number(practiceId) },
      });

      if (practiceExists) {
        const message = "Practice not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      const patientPayload = {
        ...req.body,
      };

      const newPatient = await PrismaService.client.patient.create({
        data: patientPayload,
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Patient created successfully",
        data: newPatient,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async updatePatientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const patientExists = await PrismaService.client.patient.findFirst({
        where: { id: Number(id) },
      });

      if (!patientExists) {
        const message = "Patient not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Patient updated successfully",
        data: patientExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default PatientController;
