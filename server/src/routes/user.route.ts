import { Router } from "express";
import {
  validateQuery,
  validateBody,
} from "../middlewares/requestValidator.middleware";
import {
  generateEmailVerificationCodeSchema,
  userLoginSchema,
  verifyPasswordResetCodeSchema,
  resetPasswordSchema,
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
  loginUser,
  generateEmailVerificationCode,
  verifyPasswordResetCode,
  resetPassword,
} from "../controllers/auth.controller";

const userRoute = Router();

const UserRoutes = Object.freeze({
  Profile: "/profile",
});

userRoute.get(UserRoutes.Profile, authenticate, getProfile);

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

userRoute.post(
  "/generate-email-verification-code",
  validateBody(generateEmailVerificationCodeSchema),
  generateEmailVerificationCode
);

userRoute.post(
  "/verify-passowrd-reset-code",
  validateBody(verifyPasswordResetCodeSchema),
  verifyPasswordResetCode
);

userRoute.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  resetPassword
);
export default userRoute;
