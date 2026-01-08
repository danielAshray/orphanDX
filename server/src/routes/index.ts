import { Router } from "express";
import orderRoute from "./order.route";
import patientRoute from "./patient.route";
import userRoute from "./user.route";
import organizationRoute from "./organization.route";
import statRoute from "./stat.route";
import testRoute from "./test.route";

const mainRoute = Router();

mainRoute.use("/order", orderRoute);
mainRoute.use("/patient", patientRoute);
mainRoute.use("/user", userRoute);
mainRoute.use("/organization", organizationRoute);
mainRoute.use("/stat", statRoute);
mainRoute.use("/test", testRoute);

export default mainRoute;
