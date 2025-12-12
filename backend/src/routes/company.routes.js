import express from "express";
import {
  createCompany,
  deleteCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);

router.post("/", authenticateToken, createCompany);
router.patch("/:id", authenticateToken, updateCompany);
router.delete("/:id", authenticateToken, deleteCompany);

export default router;
