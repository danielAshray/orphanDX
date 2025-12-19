import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { getPatientById, getPatients } from "../controllers/patient.controller";

const patientRoute: Router = Router();

const PatientRoutes = Object.freeze({
  Patient: "/:id",
  Patients: "/",
});

patientRoute.get(
  PatientRoutes.Patient,
  authenticate,
  authorize("PROVIDER"),
  getPatientById
);
patientRoute.get(
  PatientRoutes.Patients,
  authenticate,
  authorize("PROVIDER"),
  getPatients
);

export default patientRoute;
