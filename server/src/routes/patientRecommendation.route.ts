import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import PatientRecommendationController from "../controllers/patientRecommendation.controller";

class ProviderRoutes {
  public router: Router;
  private controller = new PatientRecommendationController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      ApiPaths.Patient_Recommendation.GET_PATIENT_RECOMMENDATION_BY_ID,
      this.controller.getPatientRecommendationById
    );
    this.router.get(
      ApiPaths.Patient_Recommendation.GET_PATIENT_RECOMMENDATIONS,
      this.controller.getPatientRecommendations
    );
    this.router.post(
      ApiPaths.Patient_Recommendation.POST_PATIENT_RECOMMENDATION,
      this.controller.postPatientRecommendation
    );
  }
}

export default new ProviderRoutes().router;
