import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import {
  fetchPatientDetails,
  fetchPatients,
} from "../controllers/patient.controller";

const patientRoute: Router = Router();

patientRoute.get(
  "",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN", "USER"], "FACILITY"),
  fetchPatients
);

patientRoute.get(
  "/details/:id",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN", "USER"], "FACILITY"),
  fetchPatientDetails
);

export default patientRoute;
