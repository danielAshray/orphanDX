import { Router } from "express";
import userRoute from "./user.route";
import facilityRoute from "./facility.route";
import labRouter from "./lab.routes";

const mainRoute = Router();

mainRoute.use("/user", userRoute);
mainRoute.use("/facility", facilityRoute);
mainRoute.use("/lab", labRouter);
export default mainRoute;
