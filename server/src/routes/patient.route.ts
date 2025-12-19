import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { fetchPatientDetails } from "../controllers/patient.controller";

const patientRoute: Router = Router();

patientRoute.get(
  "",
  authenticate,
  authorize(["FACILITY", "LAB"]),
  fetchPatientDetails
);

export default patientRoute;
