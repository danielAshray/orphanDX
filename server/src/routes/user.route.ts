import { Router } from "express";
import { ApiPaths } from "../constants/apiPaths";
import UserController from "../controllers/user.controller";
import BodySchema from "../validators/bodySchema";
import RequestValidator from "../middleware/requestValidator.middleware";
import Auth from "../auth/auth.middleware";

class UserRoutes {
  public router: Router;
  private controller = new UserController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(
      ApiPaths.User.GET_PROFILE,
      Auth.authenticate,
      this.controller.getProfile
    );
    this.router.post(
      ApiPaths.User.LOGIN,
      RequestValidator.body(BodySchema.User_Login_Body_Schema),
      this.controller.login
    );
    this.router.post(
      ApiPaths.User.REFRESH_TOKEN,
      RequestValidator.body(BodySchema.User_Rrefresh_Token_Body_Schema),
      this.controller.refresh
    );
    this.router.post(
      ApiPaths.User.REGISTER,
      RequestValidator.body(BodySchema.User_Register_Body_Schema),
      this.controller.register
    );
  }
}

export default new UserRoutes().router;
