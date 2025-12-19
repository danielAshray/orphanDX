import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiService";
import { sendResponse } from "../utils/responseService";
import { OrderStatus } from "@prisma/client";

const getDetails = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      totalLabs,
      totalProviders,
      totalPatients,
      totalOrders,
      completedOrders,
    ] = await Promise.all([
      prisma.lab.count({
        where: { status: "ACTIVE" },
      }),

      prisma.provider.count({
        where: { status: "ACTIVE" },
      }),

      prisma.patient.count({
        where: { status: "ACTIVE" },
      }),

      prisma.order.count(),

      prisma.order.count({
        where: {
          status: OrderStatus.COMPLETED,
        },
      }),
    ]);

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Details fetched successfully",
      data: {
        totalFacilities: 0,
        totalLabs,
        totalProviders,
        totalPatients,
        totalOrders,
        completedOrders,
      },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const getOverview = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recentOrders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        patient: { select: { name: true } },
        test: { select: { name: true } },
        provider: {
          include: { practice: { select: { name: true } } },
        },
      },
    });

    const formattedRecentOrders = recentOrders.map((order) => ({
      id: order.id,
      patientName: order.patient.name,
      testName: order.test.name,
      clinicName: order.provider.practice.name,
      status: order.status.toLowerCase(),
    }));

    // Assuming Facility is Practice + labPartnerId (if not yet, adjust)
    const facilities = await prisma.practice.findMany({
      include: {
        providers: true,
      },
    });

    // fetch all orders once
    const allOrders = await prisma.order.findMany();

    const labs = await prisma.lab.findMany();

    const formattedFacilities = facilities.map((facility) => {
      const facilityOrders = allOrders.filter(
        (o) => o.providerId === facility.id
      );

      const labPartner = labs.find(
        (l) => facility.id === l.id // adjust mapping if you add labPartnerId in practice/facility
      );

      return {
        id: facility.id,
        name: facility.name,
        address: facility.ehrOrgId, // placeholder, update if you have address field
        ordersCount: facilityOrders.length,
        labPartnerName: labPartner?.name ?? "—",
      };
    });

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Overview fetched successfully",
      data: {
        recentOrders: formattedRecentOrders,
        facilities: formattedFacilities,
      },
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const getFacilities = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
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

const getLabs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const labs = await prisma.lab.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        tests: {
          select: {
            name: true,
          },
        },
        orders: {
          select: {
            id: true,
          },
        },
      },
    });

    const formattedLabs = labs.map((lab) => ({
      id: lab.id,
      name: lab.name,
      address: null, // not in schema yet
      phone: null, // not in schema yet

      facilitiesCount: 0, // no Facility model in schema
      ordersCount: lab.orders.length,

      testingCapabilities: lab.tests.map((t) => t.name),
    }));

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Labs fetched successfully",
      data: formattedLabs,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const getProviders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const providers = await prisma.provider.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        practice: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    const formattedProviders = providers.map((provider) => ({
      id: provider.id,
      name: provider.user.name,
      specialty: null, // not in schema yet
      facilityName: provider.practice.name,
      npi: provider.npiNumber,
      ordersCount: provider._count.orders,
    }));

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Providers fetched successfully",
      data: formattedProviders,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

const getOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        patient: {
          select: {
            name: true,
          },
        },
        test: {
          select: {
            name: true,
            cptCode: true,
          },
        },
        provider: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
            practice: {
              select: {
                name: true,
              },
            },
          },
        },
        lab: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      patientName: order.patient.name,
      testName: order.test.name,
      testCode: order.test.cptCode,
      status: order.status.toLowerCase(), // matches UI condition
      providerName: order.provider.user.name,
      clinicName: order.provider.practice.name,
      labId: order.lab?.id ?? null,
      labName: order.lab?.name ?? "—",
    }));

    sendResponse(res, {
      success: true,
      code: 200,
      message: "Orders fetched successfully",
      data: formattedOrders,
    });
  } catch (error: any) {
    next(ApiError.internal(undefined, error.message));
  }
};

export {
  getDetails,
  getOverview,
  getFacilities,
  getLabs,
  getProviders,
  getOrders,
};
