import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/requestValidator.middleware";
import { createFacilitySchema } from "../validators/bodySchema";
import { registerFacility } from "../controllers/facility.controller";

const facilityRoute = Router();

facilityRoute.post(
  "",
  authenticate,
  authorize(["ADMIN"]),
  validateBody(createFacilitySchema),
  registerFacility
);

export default facilityRoute;
