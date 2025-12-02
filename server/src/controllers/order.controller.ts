import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";
import { logger } from "../utils/logger";

class OrderController {
  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const orderExists = await PrismaService.client.order.findFirst({
        where: { id: Number(id) },
        include: {
          patient: true,
          test: true,
          provider: true,
          lab: true,
        },
      });

      if (!orderExists) {
        const message = "Order not found";
        logger.error(message);
        throw ApiError.notFound(message);
      }

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Order fetched successfully",
        data: orderExists,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async getOrders(_req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await PrismaService.client.order.findMany({
        include: {
          patient: { select: { name: true, dob: true, gender: true } },
          test: { select: { name: true } },
          provider: {
            select: {
              user: {
                select: { name: true },
              },
              practice: {
                select: { name: true },
              },
            },
          },
          lab: { select: { name: true } },
        },
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }

  async postOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId, testId, providerId, labId, requisitionPdfUrl } =
        req.body;

      // const patientExists = await PrismaService.client.patient.findFirst({
      //   where: { id: Number(patientId) },
      // });

      // if (!patientExists) {
      //   const message = "Patient not found";
      //   logger.error(message);
      //   throw ApiError.notFound(message);
      // }

      const newOrder = await PrismaService.client.order.create({
        data: { patientId, testId, providerId, labId, requisitionPdfUrl },
      });

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Order created successfully",
        data: newOrder,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default OrderController;
