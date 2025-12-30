import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/requestValidator.middleware";
import { createOrganizationSchema } from "../validators/bodySchema";
import {
  registerOrganization,
  uploadPdf,
} from "../controllers/organization.controller";
import { uploadFile } from "../config/multer.config";

const organizationRoute = Router();

organizationRoute.post(
  "",
  authenticate,
  authorizeByRoleAndOrg(["SERVICE_ACCOUNT"]),
  validateBody(createOrganizationSchema),
  registerOrganization
);

organizationRoute.put(
  "/upload-pdf",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN"], "LAB"),
  uploadFile,
  uploadPdf
);

export default organizationRoute;
