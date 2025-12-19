import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import { sendResponse } from "../utils/responseService";

const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const orderExists = await prisma.order.findFirst({
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
      return next(ApiError.notFound(message));
    }

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Order fetched successfully",
      data: orderExists,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const getOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({
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

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { patientId, testId, providerId, labId, requisitionPdfUrl } =
      req.body;

    const patientExists = await prisma.patient.findFirst({
      where: { id: Number(patientId) },
    });

    if (!patientExists) {
      const message = "Patient not found";
      return next(ApiError.notFound(message));
    }

    const newOrder = await prisma.order.create({
      data: { patientId, testId, providerId, labId, requisitionPdfUrl },
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

export { getOrderById, getOrders, postOrder };
