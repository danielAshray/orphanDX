import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { getStatDetails } from "../controllers/stat.controller";

const statRoute = Router();

statRoute.get(
  "/details",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN"]),
  getStatDetails
);
export default statRoute;
