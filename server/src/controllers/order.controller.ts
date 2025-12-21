import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import { sendResponse } from "../utils/responseService";
import { mapStatus } from "../utils";

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
