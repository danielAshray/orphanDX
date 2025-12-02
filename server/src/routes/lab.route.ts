import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import LabController from "../controllers/lab.controller";

class LabRoutes {
  public router: Router;
  private controller = new LabController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(ApiPaths.Lab.GET_LAB_BY_ID, this.controller.getLabById);
    this.router.get(ApiPaths.Lab.GET_LABS, this.controller.getLabs);
    this.router.post(ApiPaths.Lab.POST_LAB, this.controller.postLab);
  }
}

export default new LabRoutes().router;
