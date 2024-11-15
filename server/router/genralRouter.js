import { Router } from "express";
const router = Router();

import {
  getAllGeneralInfo,
  createGeneralInfo,
  getGeneralInfoById,
  updateGeneralInfo,
  deleteGeneralInfo,
} from "../controller/generalController.js";

router.route("/").get(getAllGeneralInfo).post(createGeneralInfo);

router
  .route("/:id")
  .get(getGeneralInfoById)
  .patch(updateGeneralInfo)
  .delete(deleteGeneralInfo);

export default router;
