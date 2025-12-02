import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import PracticeController from "../controllers/practice.controller";

class ProviderRoutes {
  public router: Router;
  private controller = new PracticeController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(ApiPaths.Practice.GET_PRACTICE_BY_ID, this.controller.getPracticeById);
    this.router.get(ApiPaths.Practice.GET_PRACTICES, this.controller.getPractices);
    this.router.post(ApiPaths.Practice.POST_PRACTICE, this.controller.postPractice);
  }
}

export default new ProviderRoutes().router;
