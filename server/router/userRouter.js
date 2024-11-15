import { Router } from "express";
import { authenticateUser } from "../middleware/AuthenticationMiddleware.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit file size to 5MB
  },
});

import {
  changePassword,
  getCurrentUser,
  getImgUser,
  getUserById,
  getUsersCount,
  updateUser,
} from "../controller/userController.js";
import multer from "multer";

router.use(authenticateUser);

router.get("/", authenticateUser, getCurrentUser);
router.get("/count", getUsersCount);
router.get("/img/:id", getImgUser);
router.route("/:id").patch(changePassword);
router.patch(
  "/update/:id",
  upload.single("profileImage"),
  (req, res, next) => {
    console.log("Multer middleware processed");
    console.log("req.file:", req.file);
    next();
  },
  updateUser
);
router.patch("/user/:id", getUserById);

export default router;
