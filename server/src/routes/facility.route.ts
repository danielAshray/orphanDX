import { Router } from "express";
import { validateReqBody } from "../middleware/requestValidator.middleware";
import {
  createFacility,
  deleteFacility,
  fetchFacility,
  listAllFacilities,
  editFacility,
} from "../controllers/facility.controller";
import { authenticate } from "../middleware/auth.middleware";
import {
  createFacilityScehma,
  updateFacilitySchema,
} from "../validators/bodySchema/index";
const facilityRoute = Router();

facilityRoute.get("/", authenticate, listAllFacilities);
facilityRoute.post(
  "/",
  authenticate,
  validateReqBody(createFacilityScehma),
  createFacility
);
facilityRoute.put(
  "/:id",
  authenticate,
  validateReqBody(updateFacilitySchema),
  editFacility
);
facilityRoute.get("/:id", authenticate, fetchFacility);
facilityRoute.delete("/:id", authenticate, deleteFacility);

export default facilityRoute;
