import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import { logger } from "../utils/logger";

class TestController {
  async getTestById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const testExists = await PrismaService.client.test.findFirst({
        where: { id: Number(id) },
      });

      if (!testExists) {
        const message = "Test not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Test fetched successfully",
        data: testExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getTests(_req: Request, res: Response, next: NextFunction) {
    try {
      const tests = await PrismaService.client.test.findMany();

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Tests fetched successfully",
        data: tests,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postRecommendTest(req: Request, res: Response, next: NextFunction) {
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
        message: "Recommend test created successfully",
        data: newPatientRecommendation,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postTest(req: Request, res: Response, next: NextFunction) {
    try {
      const { labId } = req.body;

      const labExists = await PrismaService.client.lab.findFirst({
        where: { id: Number(labId) },
      });

      if (!labExists) {
        const message = "Lab not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      const testPayload = {
        ...req.body,
      };

      const newTest = await PrismaService.client.test.create({
        data: testPayload,
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Test created successfully",
        data: newTest,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default TestController;
