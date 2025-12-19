import { Router } from "express";
import {
  validateQuery,
  validateBody,
} from "../middlewares/requestValidator.middleware";
import { userLoginSchema } from "../validators/bodySchema";
import {
  getProfile,
  practiceFusionCallback,
  practiceFusionLogin,
} from "../controllers/user.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { pfCallbackQuery } from "../validators/querySchema";
import { loginLimiter } from "../middlewares/limit.middleware";
import { loginUser } from "../controllers/auth.controller";

const userRoute = Router();

const UserRoutes = Object.freeze({
  Profile: "/profile",
});

userRoute.get(
  UserRoutes.Profile,
  authenticate,
  authorize(["ADMIN", "LAB", "PROVIDER"]),
  getProfile
);

userRoute.post("/login", validateBody(userLoginSchema), loginUser);

userRoute.post(
  "/auth",
  loginLimiter,
  validateBody(userLoginSchema),
  practiceFusionLogin
);
userRoute.get(
  "/auth/callback",
  validateQuery(pfCallbackQuery),
  practiceFusionCallback
);
export default userRoute;
