import { Router } from "express";
import {
  createOnDutyForm,
  getAllOnDutyForms,
  getOnDutyFormById,
  updateOnDutyStatus,
  deleteOnDutyForm,
} from "../controller/onDutyController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";
const router = Router();

// Routes
router
  .route("/")
  .get(authenticateUser,getAllOnDutyForms) // Get all forms
  .post(authenticateUser, createOnDutyForm); // Create a form

router
  .route("/:id")
  .get(getOnDutyFormById) // Get form by ID
  .delete(deleteOnDutyForm); // Delete form

// Role-based status update (staff or HOD)
router.route("/:id").patch(authenticateUser, updateOnDutyStatus);

export default router;
