import { Router } from "express";
const router = Router();

import {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";

router.route("/").get(getAllCourses).post(createCourse);

router
  .route("/:id")
  .get(getCourseById)
  .patch(updateCourse)
  .delete(deleteCourse);

export default router;
