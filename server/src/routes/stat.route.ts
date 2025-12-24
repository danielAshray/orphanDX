import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import {
  getFacilityStatDetails,
  getStatDetails,
} from "../controllers/stat.controller";

const statRoute = Router();

statRoute.get(
  "/details",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN"]),
  getStatDetails
);
statRoute.get(
  "/facility",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN"], "FACILITY"),
  getFacilityStatDetails
);

export default statRoute;
