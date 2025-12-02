import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import { logger } from "../utils/logger";

class LabController {
  async getLabById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const labExists = await PrismaService.client.lab.findFirst({
        where: { id: Number(id) },
      });

      if (!labExists) {
        const message = "Lab not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Lab fetched successfully",
        data: labExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getLabs(_req: Request, res: Response, next: NextFunction) {
    try {
      const labs = await PrismaService.client.lab.findMany({});

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Labs fetched successfully",
        data: labs,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postLab(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, logoUrl } = req.body;

      const newOrder = await PrismaService.client.lab.create({
        data: { name, logoUrl },
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Lab created successfully",
        data: newOrder,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default LabController;
