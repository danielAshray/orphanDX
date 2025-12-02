import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import { logger } from "../utils/logger";

class PatientRecommendationController {
  async getPatientRecommendationById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { patientId, providerId, testId } = req.body;

      const patientExists = await PrismaService.client.patient.findFirst({
        where: { id: Number(patientId) },
      });

      if (!patientExists) {
        const message = "Patient not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      const providerExists = await PrismaService.client.provider.findFirst({
        where: { id: Number(providerId) },
      });

      if (!providerExists) {
        const message = "Provider not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      const testExists = await PrismaService.client.test.findFirst({
        where: { id: Number(testId) },
      });

      if (!testExists) {
        const message = "Test not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      const patientRecommendationPayload = {
        ...req.body,
      };

      const newPatientRecommendation =
        await PrismaService.client.patientRecommendation.create({
          data: patientRecommendationPayload,
        });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Patient recommendation created successfully",
        data: newPatientRecommendation,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getPatientRecommendations(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const patientRecommendations =
        await PrismaService.client.patientRecommendation.findMany();

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Patient recommendations fetched successfully",
        data: patientRecommendations,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postPatientRecommendation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const practicePayload = {
        ...req.body,
      };

      const newPractice = await PrismaService.client.practice.create({
        data: practicePayload,
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Practice created successfully",
        data: newPractice,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default PatientRecommendationController;
