import { Router } from "express";
import {
  createLab,
  deleteLab,
  editLab,
  fetchLab,
  listAllLabs,
} from "../controllers/lab.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateReqBody } from "../middleware/requestValidator.middleware";
import {
  createLabSchema,
  updateLabSchema,
} from "../validators/bodySchema/index";

const labRouter = Router();

labRouter.get("/", authenticate, listAllLabs);
labRouter.post("/", authenticate, validateReqBody(createLabSchema), createLab);
labRouter.put("/:id", authenticate, validateReqBody(updateLabSchema), editLab);
labRouter.get("/:id", authenticate, fetchLab);
labRouter.delete("/:id", authenticate, deleteLab);

export default labRouter;