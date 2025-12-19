import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import {
  getOrderById,
  getOrders,
  postOrder,
} from "../controllers/order.controller";
import { validateBody } from "../middlewares/requestValidator.middleware";
import { createOrderSchema } from "../validators/bodySchema";

const orderRoute: Router = Router();

const OrderRoutes = Object.freeze({
  Order: "/:id",
  Orders: "/",
});

orderRoute.get(
  OrderRoutes.Order,
  authenticate,
  authorize("PROVIDER"),
  getOrderById
);
orderRoute.get(
  OrderRoutes.Orders,
  authenticate,
  authorize("PROVIDER"),
  getOrders
);
orderRoute.post(
  OrderRoutes.Orders,
  authenticate,
  authorize("PROVIDER"),
  validateBody(createOrderSchema),
  postOrder
);

export default orderRoute;
