import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import TestController from "../controllers/test.controller";

class TestRoutes {
  public router: Router;
  private controller = new TestController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(ApiPaths.Test.GET_TEST_BY_ID, this.controller.getTestById);
    this.router.get(ApiPaths.Test.GET_TESTS, this.controller.getTests);
    this.router.post(
      ApiPaths.Test.POST_RECOMMEND_TEST,
      this.controller.postRecommendTest
    );
    this.router.post(ApiPaths.Test.POST_TEST, this.controller.postTest);
  }
}

export default new TestRoutes().router;
