import { Router } from "express";
const router = Router();

import {
  getAllScholarships,
  createScholarship,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
} from "../controller/schollarController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

router
  .route("/")
  .get(getAllScholarships)
  .post(authenticateUser, createScholarship);

router
  .route("/:id")
  .get(getScholarshipById)
  .patch(authenticateUser, updateScholarship)
  .delete(authenticateUser, deleteScholarship);

export default router;
