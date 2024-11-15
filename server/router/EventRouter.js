import { Router } from "express";
const router = Router();

import {
  getAllEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controller/eventController.js";

import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

router.route("/").get(getAllEvents).post(authenticateUser, createEvent);

router
  .route("/:id")
  .get(getEventById)
  .patch(authenticateUser, updateEvent)
  .delete(authenticateUser, deleteEvent);

export default router;
