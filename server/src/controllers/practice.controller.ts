import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import { logger } from "../utils/logger";

class PracticeController {
  async getPracticeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const practiceExists = await PrismaService.client.practice.findFirst({
        where: { id: Number(id) },
      });

      if (!practiceExists) {
        const message = "Practice not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Practice fetched successfully",
        data: practiceExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getPractices(_req: Request, res: Response, next: NextFunction) {
    try {
      const practices = await PrismaService.client.practice.findMany();

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Practices fetched successfully",
        data: practices,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postPractice(req: Request, res: Response, next: NextFunction) {
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

export default PracticeController;
