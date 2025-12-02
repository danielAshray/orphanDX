import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import EventController from "../controllers/event.controller";

class EventRoutes {
  public router: Router;
  private controller = new EventController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(ApiPaths.Event.GET_EVENTS, this.controller.getEvents);
  }
}

export default new EventRoutes().router;
