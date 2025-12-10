import { Router } from "express";
import {
  validateQuery,
  validateReqBody,
} from "../middleware/requestValidator.middleware";
import {
  userLoginBodySchema,
  userRegisterBodySchema,
} from "../validators/bodySchema";
import {
  getProfile,
  loginUser,
  practiceFusionCallback,
  practiceFusionLogin,
  registerUser,
} from "../controllers/user.controller";
import { authenticate, authRoute } from "../middleware/auth.middleware";
import { pfCallbackQuery } from "../validators/querySchema";
import { loginLimiter } from "../middleware/limit.middleware";

const userRoute = Router();

userRoute.post("/login", validateReqBody(userLoginBodySchema), loginUser);
userRoute.get("/profile", authenticate, authRoute(getProfile));
userRoute.post(
  "/register",
  validateReqBody(userRegisterBodySchema),
  registerUser
);

userRoute.post(
  "/auth",
  loginLimiter,
  validateReqBody(userLoginBodySchema),
  practiceFusionLogin
);
userRoute.get(
  "/auth/callback",
  validateQuery(pfCallbackQuery),
  practiceFusionCallback
);
export default userRoute;
