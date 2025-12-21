import { Router } from "express";
import {
  createOrder,
  getDashboard,
  orderTracking,
} from "../controllers/order.controller";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";

const orderRoute: Router = Router();

orderRoute.post(
  "/:recomendationId",
  authenticate,
  authorizeByRoleAndOrg(["USER", "ADMIN"], "FACILITY"),
  createOrder
);

orderRoute.get(
  "/",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN", "USER"], "LAB"),
  getDashboard
);

orderRoute.get(
  "/track",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN", "USER"], "LAB"),
  orderTracking
);

export default orderRoute;
