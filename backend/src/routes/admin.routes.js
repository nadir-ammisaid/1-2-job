import express from "express";
import {
  getAdminStats,
  getAllUsers,
  getAllCompanies,
  getAllJobsAdmin,
  promoteToAdmin,
  demoteFromAdmin,
} from "../controllers/admin.controller.js";
import { authenticateAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/stats", authenticateAdmin, getAdminStats);
router.get("/users", authenticateAdmin, getAllUsers);
router.get("/companies", authenticateAdmin, getAllCompanies);
router.get("/jobs", authenticateAdmin, getAllJobsAdmin);
router.patch("/users/:userId/promote", authenticateAdmin, promoteToAdmin);
router.patch("/users/:userId/demote", authenticateAdmin, demoteFromAdmin);

export default router;
