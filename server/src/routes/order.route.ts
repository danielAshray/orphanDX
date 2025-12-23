import { Router } from "express";
import {
  completeOrder,
  createOrder,
  getDashboard,
  orderTracking,
} from "../controllers/order.controller";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/requestValidator.middleware";
import {
  completeTestResultSchema,
  createOrderSchema,
} from "../validators/bodySchema";

const orderRoute: Router = Router();

orderRoute.post(
  "",
  authenticate,
  authorizeByRoleAndOrg(["USER", "ADMIN"], "FACILITY"),
  validateBody(createOrderSchema),
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

orderRoute.put(
  "/complete",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN"], "LAB"),
  validateBody(completeTestResultSchema),
  completeOrder
);

export default orderRoute;
