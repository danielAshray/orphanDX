import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import TestEligibilityRuleController from "../controllers/testEligiblityRule.controller";

class TestEligibilityRuleRoutes {
  public router: Router;
  private controller = new TestEligibilityRuleController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      ApiPaths.Test_Eligibility_Rule.GET_TEST_ELIGIBILITY_RULE_BY_ID,
      this.controller.getTestEligibilityRuleById
    );
    this.router.get(
      ApiPaths.Test_Eligibility_Rule.GET_TEST_ELIGIBILITY_RULES,
      this.controller.getEligibilityRules
    );
    this.router.post(
      ApiPaths.Test_Eligibility_Rule.POST_TEST_ELIGIBILITY_RULE,
      this.controller.postEligibilityRule
    );
  }
}

export default new TestEligibilityRuleRoutes().router;
