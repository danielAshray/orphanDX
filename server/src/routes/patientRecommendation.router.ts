import { Router } from "express";
import { recommendPatient } from "../controllers/patientRecommendation.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, recommendPatient);

export default router;
