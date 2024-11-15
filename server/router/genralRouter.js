import { Router } from "express";
const router = Router();

import {
  getAllGeneralInfo,
  createGeneralInfo,
  getGeneralInfoById,
  updateGeneralInfo,
  deleteGeneralInfo,
} from "../controller/generalController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";
router
  .route("/")
  .get(getAllGeneralInfo)
  .post(authenticateUser, createGeneralInfo);

router
  .route("/:id")
  .get(getGeneralInfoById)
  .patch(authenticateUser, updateGeneralInfo)
  .delete(authenticateUser, deleteGeneralInfo);

export default router;
