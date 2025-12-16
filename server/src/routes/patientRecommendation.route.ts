import { Router } from "express";
import {
  recommendPatient,
  editPatientRecommendation,
} from "../controllers/patientRecommendation.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateReqBody } from "../middleware/requestValidator.middleware";
import {
  createPatientRecommendationBodySchema,
  editPatientRecommendationBodySchema,
} from "../validators/bodySchema/index";

const router = Router();

router.post(
  "/",
  authenticate,
  validateReqBody(createPatientRecommendationBodySchema),
  recommendPatient
);

router.put(
  "/:id",
  authenticate,
  validateReqBody(editPatientRecommendationBodySchema),
  editPatientRecommendation
);

export default router;
