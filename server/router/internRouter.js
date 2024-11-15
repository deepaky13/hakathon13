import { Router } from "express";
const router = Router();

import {
  getAllInternships,
  createInternship,
  getInternshipById,
  updateInternship,
  deleteInternship,
} from "../controller/internContoller.js";

router.route("/").get(getAllInternships).post(createInternship);

router
  .route("/:id")
  .get(getInternshipById)
  .patch(updateInternship)
  .delete(deleteInternship);

export default router;
