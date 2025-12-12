import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/", createUser);

// Protected routes
router.get("/", authenticateToken, getAllUsers);
router.get("/me", authenticateToken, getCurrentUser);
router.get("/:id", authenticateToken, getUserById);
router.patch("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;
