import express from "express";
import {
  getAllJobs,
  getJobById,
  createJob,
  deleteJob,
  updateJob,
} from "../controllers/job.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllJobs);
router.get("/:id", getJobById);

// Protected routes
router.post("/", authenticateToken, createJob);
router.patch("/:id", authenticateToken, updateJob);
router.delete("/:id", authenticateToken, deleteJob);

export default router;
