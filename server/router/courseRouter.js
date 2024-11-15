import { Router } from "express";
const router = Router();

import {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

router.route("/").get(getAllCourses).post(authenticateUser, createCourse);

router
  .route("/:id")
  .get(getCourseById)
  .patch(authenticateUser, updateCourse)
  .delete(authenticateUser, deleteCourse);

export default router;
