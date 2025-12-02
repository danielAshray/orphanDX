import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import { logger } from "../utils/logger";

class ProviderController {
  async getProviderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const providerExists = await PrismaService.client.provider.findFirst({
        where: { id: Number(id) },
      });

      if (!providerExists) {
        const message = "Provider not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Provider fetched successfully",
        data: providerExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getProviders(_req: Request, res: Response, next: NextFunction) {
    try {
      const providers = await PrismaService.client.provider.findMany();

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Providers fetched successfully",
        data: providers,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postProvider(req: Request, res: Response, next: NextFunction) {
    try {
      const { practiceId } = req.body;

      const practiceExists = await PrismaService.client.practice.findFirst({
        where: { id: Number(practiceId) },
      });

      if (!practiceExists) {
        const message = "Practice not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      const providerPayload = {
        ...req.body,
      };

      const newProvider = await PrismaService.client.provider.create({
        data: providerPayload,
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Provider created successfully",
        data: newProvider,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default ProviderController;
