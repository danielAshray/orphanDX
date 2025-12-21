import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { fetchPatientDetails } from "../controllers/patient.controller";

const patientRoute: Router = Router();

patientRoute.get(
  "",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN", "USER"], "FACILITY"),
  fetchPatientDetails
);

export default patientRoute;
