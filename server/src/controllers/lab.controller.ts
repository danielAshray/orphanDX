import { NextFunction, Response, Request } from "express";
import { prisma } from "../prisma";

export const createLab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const lab = await prisma.lab.create({ data });
    res.status(201).json({
      message: "Lab successfully created",
      data: lab,
    });
  } catch (exception) {
    next(exception);
  }
};

export const editLab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const lab = await prisma.lab.findFirst({ where: { id: +id } });
    if (!lab) {
      res.status(404).json({ message: "Lab not found" });
    }
    const updatedLab = await prisma.lab.update({
      where: { id: +id },
      data,
    });
    res.status(201).json({
      message: "Lab successfully updated",
      data: updatedLab,
    });
  } catch (exception) {
    next(exception);
  }
};

export const deleteLab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const lab = await prisma.lab.findFirst({ where: { id: +id } });
    if (!lab) {
      res.status(404).json({ message: "Lab not found" });
    }
    await prisma.lab.delete({ where: { id: +id } });
    res.status(201).json({
      message: "Lab successfully deleted",
      data: lab,
    });
  } catch (exception) {
    next(exception);
  }
};

export const listAllLabs = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const labs = await prisma.lab.findMany({
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
      message: "Lab successfully fetched",
      data: labs,
    });
  } catch (exception) {
    next(exception);
  }
};

export const fetchLab = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const lab = await prisma.lab.findFirst({ where: { id: +id } });
    if (!lab) {
      res.status(404).json({ message: "Lab not found" });
    }
    res.status(201).json({
      message: "Lab successfully updated",
      data: lab,
    });
  } catch (exception) {
    next(exception);
  }
};
