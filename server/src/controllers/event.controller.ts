import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

const getEvents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await prisma.event.findMany({});

    return res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export { getEvents };
