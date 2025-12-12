import express from "express";
import {
  getApplicationsByUserId,
  createApplication,
  deleteApplication,
} from "../controllers/application.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes are protected
router.get("/user/:userId", authenticateToken, getApplicationsByUserId);
router.post("/", authenticateToken, createApplication);
router.delete("/:id", authenticateToken, deleteApplication);

export default router;
