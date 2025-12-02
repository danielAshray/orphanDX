import { Router } from "express";
import { validateReqBody } from "../middleware/requestValidator.middleware";
import {
  userLoginBodySchema,
  userRegisterBodySchema,
} from "../validators/bodySchema";
import {
  getProfile,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
import { authenticate, authRoute } from "../middleware/auth.middleware";

const userRoute = Router();

userRoute.post("/login", validateReqBody(userLoginBodySchema), loginUser);
userRoute.get("/profile", authenticate, authRoute(getProfile));
userRoute.post(
  "/register",
  validateReqBody(userRegisterBodySchema),
  registerUser
);

export default userRoute;
