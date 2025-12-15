import { Router } from "express";
import userRoute from "./user.route";
import facilityRoute from "./facility.route";

const mainRoute = Router();

mainRoute.use("/user", userRoute);
mainRoute.use("/facility", facilityRoute);
export default mainRoute;
