import { Router } from "express";
import {
  completeOrder,
  createManualOrder,
  createNewManualOrder,
  createOrder,
  getDashboard,
  orderTracking,
  simulateOrder,
  uploadResultPDF,
} from "../controllers/order.controller";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/requestValidator.middleware";
import {
  createManualOrderSchema,
  createNewManualOrderSchema,
  createOrderSchema,
} from "../validators/bodySchema";
import { uploadFile } from "../config/multer.config";

const orderRoute: Router = Router();

orderRoute.post(
  "/simulate-order",
  authenticate,
  authorizeByRoleAndOrg(["USER", "ADMIN"], "FACILITY"),
  validateBody(createOrderSchema),
  simulateOrder
);

orderRoute.post(
  "",
  authenticate,
  authorizeByRoleAndOrg(["USER", "ADMIN"], "FACILITY"),
  validateBody(createOrderSchema),
  createOrder
);

orderRoute.post(
  "/manual",
  authenticate,
  authorizeByRoleAndOrg(["USER", "ADMIN"], "FACILITY"),
  validateBody(createManualOrderSchema),
  createManualOrder
);

orderRoute.post(
  "/new-manual-order",
  authenticate,
  authorizeByRoleAndOrg(["USER", "ADMIN"], "FACILITY"),
  validateBody(createNewManualOrderSchema),
  createNewManualOrder
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

orderRoute.get(
  "/order-tracking",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN", "USER"], "FACILITY"),
  orderTracking
);

orderRoute.put(
  "/complete/:id",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN"], "LAB"),
  completeOrder
);

orderRoute.put(
  "/upload/:id",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN"], "LAB"),
  uploadFile,
  uploadResultPDF
);

export default orderRoute;
