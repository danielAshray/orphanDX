import { Router } from "express";
import userRoute from "./user.route";
import facilityRoute from "./facility.route";
import labRouter from "./lab.routes";
import patientRecommendationRouter from "./patientRecommendation.router";

const mainRoute = Router();

mainRoute.use("/user", userRoute);
mainRoute.use("/facility", facilityRoute);
mainRoute.use("/patient-recommendation", patientRecommendationRouter);
mainRoute.use("/lab", labRouter);
export default mainRoute;
