import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
// import { UserRoles } from "../constants/userRoles";
import PatientController from "../controllers/patient.controller";
// import Auth from "../auth/auth.middleware";

class PatientRoutes {
  public router: Router;
  private controller = new PatientController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.delete(
      ApiPaths.Patient.DELETE_PATIENT_BY_ID,
      this.controller.deletePatientById
    );
    this.router.get(
      ApiPaths.Patient.GET_PATIENT_BY_ID,
      this.controller.getPatientById
    );
    this.router.get(ApiPaths.Patient.GET_PATIENTS, this.controller.getPatients);
    this.router.post(
      ApiPaths.Patient.POST_PATIENT,
      this.controller.postPatient
    );
    this.router.put(
      ApiPaths.Patient.UPDATE_PATIENT_BY_ID,
      this.controller.updatePatientById
    );
  }
}

export default new PatientRoutes().router;
