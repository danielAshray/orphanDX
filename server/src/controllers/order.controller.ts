import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/responseService";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import { mapStatus } from "../utils";

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
      await tx.patient.update({
        where: {
          id: recomendation.patientId,
        },
        data: {
          scheduledCount: { increment: 1 },
          recomendationCount: { decrement: 1 },
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

export const completeOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";

    const { summary, recomendations, result, orderId } = req.body;

    const order = await prisma.labOrder.findUnique({
      where: { id: orderId, labId: organizationId, status: "PENDING" },
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
    next(ApiError.internal("Failed to create order", error));
  }
};

const getDashboard = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const [providerCount, totalOrders, activeOrders, facilityCount] =
      await Promise.all([
        prisma.user.count({
          where: { organization: { role: "FACILITY" }, role: "USER" },
        }),
        prisma.labOrder.count(),
        prisma.labOrder.count({ where: { status: "PENDING" } }),
        prisma.organization.count({ where: { role: "FACILITY" } }),
      ]);

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Dashboard fetched successfully",
      data: {
        providerCount,
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
    const { status, patientId, providerId } = req.query;

    const whereClause: any = {};
    if (status) whereClause.status = status.toString().toUpperCase();
    if (patientId) whereClause.patientId = patientId.toString();
    if (providerId) whereClause.createdById = providerId.toString();

    const labOrders = await prisma.labOrder.findMany({
      where: whereClause,
      include: {
        patient: true,
        diagnosis: true,
        facility: true,
        lab: true,
        createdBy: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const orders = labOrders.map((order) => {
      let labResult;
      if (order.results) {
        try {
          const parsedResults = JSON.parse(order.results);
          labResult = {
            id: order.id,
            orderId: order.id,
            testName: order.diagnosis.name,
            completedDate: order.completedAt?.toISOString() || "",
            reportUrl: parsedResults.reportUrl,
            results: parsedResults.results || [],
            interpretation: parsedResults.interpretation || "",
            recommendedFollowUp: parsedResults.recommendedFollowUp || [],
          };
        } catch {
          labResult = undefined;
        }
      }

      return {
        id: order.id,
        patientId: order.patientId,
        patientName: `${order.patient.firstName} ${order.patient.lastName}`,
        providerId: order.createdById,
        providerName: order.createdBy.name,
        clinicName: order.facility.name,
        testName: order.diagnosis.name,
        testCode: order.diagnosis.icd10,
        status: mapStatus(order.status),
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
        scheduledDate: order.orderedAt.toISOString(),
        labResult,
      };
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

export { getDashboard, orderTracking };
