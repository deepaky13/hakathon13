import { Router } from "express";
const router = Router();

import {
  getAllInternships,
  createInternship,
  getInternshipById,
  updateInternship,
  deleteInternship,
} from "../controller/internContoller.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

router
  .route("/")
  .get(getAllInternships)
  .post(authenticateUser, createInternship);

router
  .route("/:id")
  .get(getInternshipById)
  .patch(authenticateUser, updateInternship)
  .delete(authenticateUser, deleteInternship);

export default router;
