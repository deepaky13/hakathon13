import { Router } from "express";
const router = Router();

import {
  getAllExamTimetables,
  createExamTimetable,
  getExamTimetableById,
  updateExamTimetable,
  deleteExamTimetable,
} from "../controller/examController.js";

import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";


router
  .route("/")
  .get(getAllExamTimetables)
  .post(authenticateUser, createExamTimetable);

router
  .route("/:id")
  .get(getExamTimetableById)
  .patch(authenticateUser, updateExamTimetable)
  .delete(authenticateUser, deleteExamTimetable);

export default router;
