import { Router } from "express";
import {
  addUserController,
  deleteUserController,
  getAllUsersController,
  loginController,
  updateUserController,
} from "../controllers/userController.js";

const router = Router();

// ================= GET =====================
router.get("/", getAllUsersController);
router.get("/");

// ================= POST ====================
router.post("/", addUserController);
router.post("/login", loginController);

// ================= DELETE ===================
router.delete("/", deleteUserController);

// ================= PUT ======================
router.put("/:id", updateUserController);

export default router;
