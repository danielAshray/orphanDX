import { Router } from "express";
import {
  validateQuery,
  validateBody,
} from "../middlewares/requestValidator.middleware";
import {
  changePasswordSchema,
  updateProfileSchema,
  userLoginSchema,
} from "../validators/bodySchema";
import {
  getProfile,
  practiceFusionCallback,
  practiceFusionLogin,
} from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { pfCallbackQuery } from "../validators/querySchema";
import { loginLimiter } from "../middlewares/limit.middleware";
import {
  changePassword,
  loginUser,
  updateProfile,
} from "../controllers/auth.controller";

const userRoute = Router();

userRoute.get("/profile", authenticate, getProfile);

userRoute.post("/login", validateBody(userLoginSchema), loginUser);

userRoute.post(
  "/change-password",
  authenticate,
  validateBody(changePasswordSchema),
  changePassword
);

userRoute.put(
  "/update-profile",
  authenticate,
  validateBody(updateProfileSchema),
  updateProfile
);

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
