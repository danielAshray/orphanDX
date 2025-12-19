import { Router } from "express";
import {
  getDetails,
  getFacilities,
  getLabs,
  getOrders,
  getOverview,
  getProviders,
} from "../controllers/admin.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const adminRoute: Router = Router();

const AdminRoutes = Object.freeze({
  Details: "/",
  Overview: "/overview",
  Facilities: "/facilities",
  Labs: "/labs",
  Providers: "/providers",
  Orders: "/orders",
});

adminRoute.get(
  AdminRoutes.Details,
  authenticate,
  authorize("ADMIN"),
  getDetails
);
adminRoute.get(
  AdminRoutes.Overview,
  authenticate,
  authorize("ADMIN"),
  getOverview
);
adminRoute.get(
  AdminRoutes.Facilities,
  authenticate,
  authorize("ADMIN"),
  getFacilities
);
adminRoute.get(AdminRoutes.Labs, authenticate, authorize("ADMIN"), getLabs);
adminRoute.get(
  AdminRoutes.Providers,
  authenticate,
  authorize("ADMIN"),
  getProviders
);
adminRoute.get(AdminRoutes.Orders, authenticate, authorize("ADMIN"), getOrders);

export default adminRoute;
