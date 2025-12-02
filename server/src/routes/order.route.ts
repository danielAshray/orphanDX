import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
// import { UserRoles } from "../constants/userRoles";
import OrderController from "../controllers/order.controller";
// import Auth from "../auth/auth.middleware";

class OrderRoutes {
  public router: Router;
  private controller = new OrderController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      ApiPaths.Order.GET_ORDER_BY_ID,
      // Auth.authenticate,
      // Auth.authorize(UserRoles.ADMIN, UserRoles.LAB),
      this.controller.getOrderById
    );
    this.router.get(
      ApiPaths.Order.GET_ORDERS,
      // Auth.authenticate,
      // Auth.authorize(UserRoles.ADMIN, UserRoles.LAB),
      this.controller.getOrders
    );
    this.router.post(
      ApiPaths.Order.POST_ORDER,
      // Auth.authenticate,
      // Auth.authorize(UserRoles.PROVIDER),
      this.controller.postOrder
    );
  }
}

export default new OrderRoutes().router;
