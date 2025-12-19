import { Router } from "express";
import {
  loginUser,
  refreshToken,
  registerUser,
} from "../controllers/auth.controller";
import { validateBody } from "../middlewares/requestValidator.middleware";
import {
  refreshTokenSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../validators/bodySchema";

const authRoute: Router = Router();

const AuthRoutes = Object.freeze({
  Login: "/login",
  Refresh: "/refresh",
  Regiter: "/register",
});

authRoute.post(AuthRoutes.Login, validateBody(userLoginSchema), loginUser);
authRoute.post(
  AuthRoutes.Refresh,
  validateBody(refreshTokenSchema),
  refreshToken
);
authRoute.post(
  AuthRoutes.Regiter,
  validateBody(userRegisterSchema),
  registerUser
);

export default authRoute;
