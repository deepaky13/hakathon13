import { Router } from "express";
const router = Router();

import {
  getAllScholarships,
  createScholarship,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
} from "../controller/schollarController.js";

router.route("/").get(getAllScholarships).post(createScholarship);

router
  .route("/:id")
  .get(getScholarshipById)
  .patch(updateScholarship)
  .delete(deleteScholarship);

export default router;
