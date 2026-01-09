import { Router } from "express";
import {
  authenticate,
  authorizeByRoleAndOrg,
} from "../middlewares/auth.middleware";
import { fetchTests } from "../controllers/test.controller";

const testRoute: Router = Router();

testRoute.get(
  "",
  authenticate,
  authorizeByRoleAndOrg(["ADMIN", "USER"], "FACILITY"),
  fetchTests
);

export default testRoute;
