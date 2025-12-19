import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { getStatDetails } from "../controllers/stat.controller";

const statRoute = Router();

statRoute.get("/details", authenticate, authorize(["ADMIN"]), getStatDetails);
export default statRoute;
