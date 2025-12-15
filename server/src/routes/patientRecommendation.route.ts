import { Router } from "express";
import { recommendPatient } from "../controllers/patientRecommendation.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateReqBody } from "../middleware/requestValidator.middleware";
import { createPatientRecommendationBodySchema } from "../validators/bodySchema/index";

const router = Router();

router.post(
  "/",
  authenticate,
  validateReqBody(createPatientRecommendationBodySchema),
  recommendPatient
);

export default router;
