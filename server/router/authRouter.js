import { Router } from "express";
import {
  login,
  register,
  logout,
  adminLogin,
  staffLogin,
} from "../controller/authController.js";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

const router = Router();
router.use(authenticateUser);

router.post("/register", register);
router.post("/login", login);
router.post("/login-staff", staffLogin);
router.post("/login-admin", adminLogin);
router.get("/logout", logout);

export default router;
