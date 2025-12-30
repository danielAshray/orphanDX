import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/responseService";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import uploadToCLoudinary from "../config/cloudinary.config";
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";
    const userId = req.user?.id || "";
    const { recomendationIds } = req.body;

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
          tests: {
            createMany: {
              data: recommendations.map(({ testName, cptCode }) => ({
                testName,
                cptCode,
              })),
            },
          },
          createdById: userId,
          status: "ORDERED",
        },
        include: {
          tests: true,
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
      tests: newOrder.tests,
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

    const orderId = req.params.id;

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
          status: "COMPLETED",
        },
      });

      await tx.patient.update({
        where: {
          id: newOrder.patientId,
        },
        data: {
          completedCount: { increment: 1 },
        },
      });

      return { newOrder };
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Order completed successfully",
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
        tests: true,
        patient: true,
        diagnosis: {
          select: { diagnosis: { select: { name: true, icd10: true } } },
        },
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

const uploadResultPDF = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("in here")
    const id = req.params.id;
    if (!req.file) {
      return res.status(500).json(ApiError.internal("Error uploading file"));
    }
    const updatedResponse = await prisma.$transaction(async (tx) => {
      const cloudinaryUrl = await uploadToCLoudinary(req.file?.path!);
      console.log("url: " ,cloudinaryUrl)
      const updatedOrder = await tx.labOrder.update({
        where: { id },
        data: {
          resultPdfUrl: cloudinaryUrl,
        },
      });
      return updatedOrder;
    });
    sendResponse(res, {
      success: true,
      code: 201,
      message: "PDF successfully uploaded",
      data: updatedResponse,
    });
  } catch (exception: any) {
    console.log("exception: ", exception)
    next(ApiError.internal(undefined, exception.message));
  }
};

export { getDashboard, orderTracking, uploadResultPDF };
