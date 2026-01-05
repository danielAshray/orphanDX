import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/requestValidator.middleware";
import { createOrganizationSchema } from "../validators/bodySchema";
import {
  getLabs,
  registerOrganization,
} from "../controllers/organization.controller";

const organizationRoute = Router();

organizationRoute.post(
  "",
  authenticate,
  authorizeByRoleAndOrg(["SERVICE_ACCOUNT"]),
  validateBody(createOrganizationSchema),
  registerOrganization
);

organizationRoute.get(
  "",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN"], "FACILITY"),
  getLabs
);

export default organizationRoute;
