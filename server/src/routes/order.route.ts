import { Router } from "express";
import {
  completeOrder,
  createOrder,
  getDashboard,
  orderTracking,
  uploadResultPDF,
  serveFile
} from "../controllers/order.controller";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/requestValidator.middleware";
import { createOrderSchema } from "../validators/bodySchema";
import upload from "../config/multer.config";

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
  upload.single("pdf"),
  uploadResultPDF
);

orderRoute.get(
  "/file/:id",
  // authenticate,
  // authorizeByRoleAndOrg(["ADMIN"], "LAB"),
  serveFile
);

export default orderRoute;
