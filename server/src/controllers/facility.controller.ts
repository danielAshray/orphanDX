import { NextFunction, Response, Request } from "express";
import { prisma } from "../prisma";
import { UserRole } from "@prisma/client";
export const createFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const facility = await prisma.facility.create({ data });
    res.status(201).json({
      message: "Facility successfully created",
      data: facility,
    });
  } catch (exception) {
    next(exception);
  }
};

export const editFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const facility = await prisma.facility.findFirst({ where: { id: +id } });
    if (!facility) {
      res.status(404).json({ message: "Facility not found" });
    }
    const updatedFacility = await prisma.facility.update({
      where: { id: +id },
      data,
    });
    res.status(201).json({
      message: "Facility successfully updated",
      data: updatedFacility,
    });
  } catch (exception) {
    next(exception);
  }
};

export const deleteFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const facility = await prisma.facility.findFirst({ where: { id: +id } });
    if (!facility) {
      res.status(404).json({ message: "Facility not found" });
    }
    await prisma.facility.delete({ where: { id: +id } });
    res.status(201).json({
      message: "Facility successfully deleted",
      data: facility,
    });
  } catch (exception) {
    next(exception);
  }
};

export const listAllFacilities = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const facilities = await prisma.facility.findMany({
      include: {
        users: {
          select: {
            name: true,
            email: true,
            status: true,
          },
        },
      },
    });
    res.status(201).json({
      message: "Facility successfully fetched",
      data: facilities,
    });
  } catch (exception) {
    next(exception);
  }
};

export const fetchFacility = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const facility = await prisma.facility.findFirst({ where: { id: +id } });
    if (!facility) {
      res.status(404).json({ message: "Facility not found" });
    }
    res.status(201).json({
      message: "Facility successfully updated",
      data: facility,
    });
  } catch (exception) {
    next(exception);
  }
};

export const listAllProviders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const providers = await prisma.user.findMany({
      where: { role: UserRole.PROVIDER },
    });
    res
      .status(200)
      .json({ message: "Providers successfully fetched", data: providers });
  } catch (exception) {
    next(exception);
  }
};
