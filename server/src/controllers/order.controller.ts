import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/responseService";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";
    const userId = req.user?.id || "";
    const { recomendationId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        organizationId,
        id: userId,
      },
    });

    if (!user) return next({ code: 400, message: "user not found" });

    const recomendation = await prisma.labRecommendation.findUnique({
      where: { id: recomendationId, status: "PENDING" },
      include: {
        diagnosis: true,
        labRule: true,
        patient: { select: { facilityId: true } },
      },
    });

    if (!recomendation)
      return next({ code: 404, message: "Recomendation record not found" });

    const { newOrder } = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.labOrder.create({
        data: {
          facilityId: organizationId,
          labId: recomendation.labRule.labId,
          patientId: recomendation.patientId,
          diagnosisId: recomendation.diagnosisId,
          createdById: userId,
          status: "PENDING",
        },
        include: {
          facility: true,
          lab: true,
          patient: {
            include: {
              insurance: true,
            },
          },
          diagnosis: true,
          createdBy: true,
        },
      });

      await tx.labRecommendation.update({
        where: {
          id: recomendation.id,
        },
        data: {
          status: "ORDERED",
        },
      });

      return { newOrder };
    });

    const orderData = {
      orderId: newOrder.id,
      patient: newOrder.patient,
      test: {
        name: recomendation.diagnosisId,
        code: recomendation.diagnosis.icd10,
        id: recomendation.diagnosis.id,
      },
      provider: {
        name: user.name,
        npi: "NPI-123456789",
        phone: "(555) 100-2000",
      },
      clinic: {
        name: newOrder.facility.name,
        address: newOrder.facility.street,
        city: newOrder.facility.city,
        state: newOrder.facility.state,
        zip: newOrder.facility.zipCode,
        phone: newOrder.facility.phone,
      },
      diagnosis: newOrder.diagnosis,
    };

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Order created successfully",
      data: orderData,
    });
  } catch (error: any) {
    console.error(error);
    next(ApiError.internal("Failed to create order", error));
  }
};
