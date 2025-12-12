import { Application } from "../models/Application.js";

// Get all applications for a user
export async function getApplicationsByUserId(req, res) {
  try {
    const applications = await Application.getByUserId(req.params.userId);
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create an application
export async function createApplication(req, res) {
  try {
    const result = await Application.create(req.body);
    res.status(201).json({
      message: "Application created successfully",
      id_application: result.id_application,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Delete an application
export async function deleteApplication(req, res) {
  try {
    const result = await Application.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
