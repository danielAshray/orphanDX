import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/requestValidator.middleware";
import { createOrganizationSchema } from "../validators/bodySchema";
import { registerOrganization } from "../controllers/organization.controller";

const organizationRoute = Router();

organizationRoute.post(
  "",
  authenticate,
  authorizeByRoleAndOrg(["SERVICE_ACCOUNT"]),
  validateBody(createOrganizationSchema),
  registerOrganization
);

export default organizationRoute;
