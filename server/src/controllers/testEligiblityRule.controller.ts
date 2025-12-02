import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import { logger } from "../utils/logger";

class TestEligibilityRuleController {
  async getTestEligibilityRuleById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const testEligibilityRuleExists =
        await PrismaService.client.testEligibilityRule.findFirst({
          where: { id: Number(id) },
        });

      if (!testEligibilityRuleExists) {
        const message = "Test eligibility rule not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Test eligibility rule fetched successfully",
        data: testEligibilityRuleExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getEligibilityRules(_req: Request, res: Response, next: NextFunction) {
    try {
      const testEligibilityRules =
        await PrismaService.client.testEligibilityRule.findMany();

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Test eligibility rules fetched successfully",
        data: testEligibilityRules,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postEligibilityRule(req: Request, res: Response, next: NextFunction) {
    try {
      const { testId } = req.body;

      const testExists = await PrismaService.client.test.findFirst({
        where: { id: Number(testId) },
      });

      if (!testExists) {
        const message = "Test not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      const testEligibilityRulePayload = {
        ...req.body,
      };

      const newTestEligibilityRule =
        await PrismaService.client.testEligibilityRule.create({
          data: testEligibilityRulePayload,
        });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Test eligibility rule created successfully",
        data: newTestEligibilityRule,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default TestEligibilityRuleController;
