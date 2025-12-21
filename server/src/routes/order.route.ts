import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { createOrder } from "../controllers/order.controller";

const orderRoute: Router = Router();

orderRoute.post(
  "/:recomendationId",
  authenticate,
  authorizeByRoleAndOrg(["USER", "ADMIN"], "FACILITY"),
  createOrder
);

export default orderRoute;
