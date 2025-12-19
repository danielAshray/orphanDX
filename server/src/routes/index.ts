import { Router } from "express";
import authRoute from "./auth.route";
import orderRoute from "./order.route";
import patientRoute from "./patient.route";
import userRoute from "./user.route";
import adminRoute from "./admin.route";

const mainRoute = Router();

const MainRoutes = Object.freeze({
  Admin: "/admin",
  Auth: "/auth",
  Order: "/order",
  Patient: "/patient",
  User: "/user",
});

mainRoute.use(MainRoutes.Admin, adminRoute);
mainRoute.use(MainRoutes.Auth, authRoute);
mainRoute.use(MainRoutes.Order, orderRoute);
mainRoute.use(MainRoutes.Patient, patientRoute);
mainRoute.use(MainRoutes.User, userRoute);

export default mainRoute;
