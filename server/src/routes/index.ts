import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import eventRoute from "./event.route";
import labRoute from "./lab.route";
import orderRoute from "./order.route";
import testRoute from "./test.route";
import userRoute from "./user.route";

class MainRoute {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use(ApiPaths.Main.EVENT, eventRoute);
    this.router.use(ApiPaths.Main.LAB, labRoute);
    this.router.use(ApiPaths.Main.ORDER, orderRoute);
    this.router.use(ApiPaths.Main.TEST, testRoute);
    this.router.use(ApiPaths.Main.USER, userRoute);
  }
}

export default new MainRoute().router;
