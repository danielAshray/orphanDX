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
    const { recomendationIds, cptCode, testName } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        organizationId,
        id: userId,
      },
    });

    if (!user) return next({ code: 400, message: "user not found" });

    const recommendations = await prisma.labRecommendation.findMany({
      where: { id: { in: recomendationIds }, status: "PENDING" },
      include: {
        diagnosis: true,
        labRule: true,
        patient: { select: { facilityId: true } },
      },
    });

    if (!recommendations.length)
      return next({ code: 404, message: "Recomendation record not found" });

    const patientId = recommendations[0].patientId;
    const labId = recommendations[0].labRule.labId;
    const samePatient = recommendations.every((r) => r.patientId === patientId);

    const sameLab = recommendations.every((r) => r.labRule.labId === labId);

    if (!samePatient) {
      return next({
        code: 400,
        message: "Recommendations must belong to the same patient",
      });
    }

    if (!sameLab) {
      return next({
        code: 400,
        message: "Recommendations must belong to the same lab",
      });
    }

    const { newOrder } = await prisma.$transaction(async (tx) => {
      const diagnosisIds = Array.from(
        new Set(recommendations.map((r) => r.diagnosisId))
      );

      const newOrder = await tx.labOrder.create({
        data: {
          testName,
          cptCode,
          facilityId: organizationId,
          labId,
          patientId,
          diagnosis: {
            createMany: {
              data: diagnosisIds.map((diagnosisId) => ({
                diagnosisId,
              })),
            },
          },
          createdById: userId,
          status: "ORDERED",
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

      await tx.labRecommendation.updateMany({
        where: {
          id: { in: recomendationIds },
        },
        data: {
          status: "ORDERED",
        },
      });
      await tx.patient.update({
        where: {
          id: patientId,
        },
        data: {
          scheduledCount: { increment: recommendations.length },
          recomendationCount: { decrement: recommendations.length },
        },
      });

      return { newOrder };
    });

    const orderData = {
      orderId: newOrder.id,
      patient: newOrder.patient,
      test: {
        name: testName,
        code: cptCode,
        id: newOrder.id,
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

export const completeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";

    const { summary, recomendations, result, orderId, isNormal } = req.body;

    const order = await prisma.labOrder.findUnique({
      where: { id: orderId, labId: organizationId },
    });

    if (!order) return next({ code: 404, message: "order record not found" });

    const { newOrder } = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.labOrder.update({
        where: {
          id: order.id,
        },
        data: {
          testResult: {
            create: {
              summary,
              recomendations,
              result,
              isNormal,
            },
          },
          status: "COMPLETED",
        },
      });

      await tx.patient.update({
        where: {
          id: newOrder.patientId,
        },
        data: {
          scheduledCount: { decrement: -1 },
          completedCount: { increment: 1 },
          resultCount: { increment: 1 },
        },
      });

      return { newOrder };
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error: any) {
    console.log(error);
    next(ApiError.internal("Failed to create order", error));
  }
};

const getDashboard = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [totalOrders, activeOrders, facilityCount] = await Promise.all([
      prisma.labOrder.count(),
      prisma.labOrder.count({ where: { status: "ORDERED" } }),
      prisma.organization.count({ where: { role: "FACILITY" } }),
    ]);

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Dashboard fetched successfully",
      data: {
        totalOrders,
        activeOrders,
        partnerClinics: facilityCount,
      },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const orderTracking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isFacility = req.user?.organization?.role === "FACILITY";
    const organizationId = req.user?.organization?.id;

    const labOrders = await prisma.labOrder.findMany({
      where: isFacility
        ? {
            facilityId: organizationId,
          }
        : {
            labId: organizationId,
          },
      include: {
        testResult: true,
        patient: true,
        diagnosis: { select: { diagnosis: { select: { name: true } } } },
        facility: { select: { name: true } },
        lab: true,
        createdBy: true,
      },
      orderBy: { createdAt: "desc" },
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Orders fetched successfully",
      data: labOrders,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

export { getDashboard, orderTracking };
