import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import ResponseHandler from "../utils/responseHandler";
import PrismaService from "../db/prismaService";

class EventController {
  async getEvents(_req: Request, res: Response, next: NextFunction) {
    try {
      const events = await PrismaService.client.event.findMany({});

      ResponseHandler.send(res, {
        success: true,
        code: 200,
        message: "Events fetched successfully",
        data: events,
      });
    } catch (error: any) {
      next(ApiError.internal(undefined, error.message));
    }
  }
}

export default EventController;
