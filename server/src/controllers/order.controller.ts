import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/responseService";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";

export const simulateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";
    const userId = req.user?.id || "";
    const { recomendationIds } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return next({ code: 400, message: "User not found" });

    const recommendations = await prisma.labRecommendation.findMany({
      where: { id: { in: recomendationIds }, status: "PENDING" },
      include: {
        diagnosis: true,
        labRule: true,
        patient: { select: { facilityId: true } },
      },
    });

    if (!recommendations.length)
      return next({ code: 404, message: "Recommendation record not found" });

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

    const patient = await prisma.patient.findUnique({
      where: { id: patientId },
    });

    const facility = await prisma.organization.findUnique({
      where: { id: organizationId },
    });

    const lab = await prisma.organization.findUnique({
      where: { id: labId },
    });

    const simulatedOrder = {
      id: "SIM-" + Date.now(), // fake order id
      patient: patient,
      tests: recommendations.map(({ testName, cptCode }) => ({
        testName,
        cptCode,
      })),
      facility,
      lab: lab,
      diagnosis: recommendations.map((r) => ({
        diagnosis: { name: r.diagnosis.name, icd10: r.diagnosis.icd10 },
      })),
      createdBy: { id: userId, name: user.name },
      status: "ORDERED",
    };

    const orderData = {
      orderId: simulatedOrder.id,
      patient: simulatedOrder.patient,
      tests: simulatedOrder.tests,
      provider: {
        name: user.name,
        npi: "NPI-123456789",
        phone: "(555) 100-2000",
      },
      clinic: simulatedOrder.facility,
      diagnosis: simulatedOrder.diagnosis,
      facility: simulatedOrder.facility,
      recomendationIds,
    };

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Order simulated successfully",
      data: orderData,
    });
  } catch (error: any) {
    console.error(error);
    next(ApiError.internal("Failed to simulate order", error));
  }
};

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
          diagnosis: {
            select: { diagnosis: { select: { name: true, icd10: true } } },
          },
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
          scheduledCount: { increment: 1 },
          recomendationCount: { decrement: 1 },
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
      facility: newOrder.facility,
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

export const createManualOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";
    const userId = req.user?.id || "";
    const { patientId, labId, diagnosis, tests } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        organizationId,
        id: userId,
      },
    });

    if (!user) return next({ code: 400, message: "user not found" });

    const { newOrder } = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.labOrder.create({
        data: {
          facilityId: organizationId,
          labId,
          patientId,
          diagnosis: {
            createMany: {
              data: diagnosis.map((diagnosisId: string) => ({ diagnosisId })),
            },
          },
          tests: {
            createMany: {
              data: tests.map(
                (test: { testName: string; cptCode: string }) => ({
                  testName: test.testName,
                  cptCode: test.cptCode,
                })
              ),
            },
          },
          createdById: userId,
          status: "ORDERED",
        },
        include: { tests: true },
      });

      await tx.patient.update({
        where: {
          id: patientId,
        },
        data: {
          scheduledCount: { increment: 1 },
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
    console.error(error);
    next(ApiError.internal("Failed to create order", error));
  }
};

export const createNewManualOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";
    const userId = req.user?.id || "";
    const {
      firstName,
      lastName,
      mrn,
      dateOfBirth,
      gender,
      phone,
      email,
      lastVisit,
      provider,
      plan,
      type,
      memberId,
      diagnosis,
      labId,
      tests,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        organizationId,
        id: userId,
      },
    });

    if (!user) return next({ code: 400, message: "user not found" });

    const { newOrder } = await prisma.$transaction(async (tx) => {
      const existingPatient = await tx.patient.findFirst({
        where: {
          facilityId: organizationId,
          mrn,
        },
      });

      if (existingPatient) {
        throw { code: 400, message: "Patient with this MRN already exists" };
      }

      const patient = await tx.patient.create({
        data: {
          facilityId: organizationId,
          firstName,
          lastName,
          mrn,
          dateOfBirth,
          gender,
          phone,
          email,
          lastVisit,
          insurance: {
            create: {
              provider,
              plan,
              type,
              memberId,
            },
          },
          diagnosis: {
            createMany: {
              data: diagnosis.map(
                (d: { name: string; icd10: string; onsetDate: string }) => ({
                  name: d.name,
                  icd10: d.icd10,
                  onsetDate: d.onsetDate,
                })
              ),
            },
          },
        },
        include: { diagnosis: true },
      });

      const newOrder = await tx.labOrder.create({
        data: {
          facilityId: organizationId,
          labId,
          patientId: patient.id,
          diagnosis: {
            createMany: {
              data: patient.diagnosis.map((d) => ({
                diagnosisId: d.id,
              })),
            },
          },
          tests: {
            createMany: {
              data: tests.map(
                (test: { testName: string; cptCode: string }) => ({
                  testName: test.testName,
                  cptCode: test.cptCode,
                })
              ),
            },
          },
          createdById: userId,
          status: "ORDERED",
        },
        include: { tests: true },
      });

      await tx.patient.update({
        where: {
          id: patient.id,
        },
        data: {
          scheduledCount: { increment: 1 },
        },
      });

      return { newOrder };
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "New order created successfully",
      data: newOrder,
    });
  } catch (error: any) {
    console.error(error);
    next(ApiError.internal("Failed to create order", error));
  }
};

const collectOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";

    const orderId = req.params.id;

    const { collectedAt, collectedBy } = req.body;

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
          status: "COLLECTED",
          collectedAt,
          collectedBy,
        },
      });

      await tx.patient.update({
        where: {
          id: newOrder.patientId,
        },
        data: {
          scheduledCount: { decrement: 1 },
          collectedCount: { increment: 1 },
        },
      });

      return { newOrder };
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Order collected successfully",
      data: newOrder,
    });
  } catch (error: any) {
    next(ApiError.internal("Failed to collect order", error));
  }
};

const collectOrderFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizationId = req.user?.organization?.id || "";

    const orderId = req.params.id;

    const { collectedAt, collectedBy } = req.body;

    const order = await prisma.labOrder.findUnique({
      where: { id: orderId, facilityId: organizationId },
    });

    if (!order) return next({ code: 404, message: "order record not found" });

    const { newOrder } = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.labOrder.update({
        where: {
          id: order.id,
        },
        data: {
          status: "COLLECTED",
          collectedAt,
          collectedBy,
        },
      });

      await tx.patient.update({
        where: {
          id: newOrder.patientId,
        },
        data: {
          scheduledCount: { decrement: 1 },
          collectedCount: { increment: 1 },
        },
      });

      return { newOrder };
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Order collected successfully",
      data: newOrder,
    });
  } catch (error: any) {
    next(ApiError.internal("Failed to collect order", error));
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
    const orderId = req.params.id;

    if (!req.file) {
      return next(ApiError.notFound("PDF file is required"));
    }

    const pdfPath = `/uploads/${req.file.filename}`;

    const { orderTest } = await prisma.$transaction(async (tx) => {
      const orderTest = await tx.labOrder.update({
        where: {
          id: orderId,
        },
        data: { resultPdfUrl: pdfPath, status: "COMPLETED" },
      });

      await tx.patient.update({
        where: {
          id: orderTest.patientId,
        },
        data: {
          collectedCount: { decrement: 1 },
          resultCount: { increment: 1 },
          completedCount: { increment: 1 },
        },
      });

      return { orderTest };
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Result pdf uploaded successfully",
      data: orderTest,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

export { getDashboard, orderTracking, uploadResultPDF, collectOrder, collectOrderFacility };
