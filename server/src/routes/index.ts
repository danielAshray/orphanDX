import { Router } from "express";
import userRoute from "./user.route";

const mainRoute = Router();

mainRoute.use("/user", userRoute);

export default mainRoute;
