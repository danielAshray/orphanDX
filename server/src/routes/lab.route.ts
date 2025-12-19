import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/requestValidator.middleware";
import { createLabSchema } from "../validators/bodySchema";
import { registerLab } from "../controllers/lab.controller";

const labRoute = Router();

labRoute.post(
  "",
  authenticate,
  authorize(["ADMIN"]),
  validateBody(createLabSchema),
  registerLab
);

export default labRoute;
