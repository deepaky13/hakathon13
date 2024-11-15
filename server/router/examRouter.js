import { Router } from "express";
const router = Router();

import {
  getAllExamTimetables,
  createExamTimetable,
  getExamTimetableById,
  updateExamTimetable,
  deleteExamTimetable,
} from "../controller/examController.js";

router.route("/").get(getAllExamTimetables).post(createExamTimetable);

router
  .route("/:id")
  .get(getExamTimetableById)
  .patch(updateExamTimetable)
  .delete(deleteExamTimetable);

export default router;
