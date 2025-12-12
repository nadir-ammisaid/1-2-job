import { Job } from "../models/Job.js";

export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.getAll();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getJobById(req, res) {
  try {
    const job = await Job.getById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job offer not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createJob(req, res) {
  try {
    const result = await Job.create(req.body);
    res
      .status(201)
      .json({
        message: "Job offer created successfully",
        id_job: result.id_job,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateJob(req, res) {
  try {
    const result = await Job.update(req.params.id, req.body);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Job offer not found" });
    res.json({ message: "Job offer updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteJob(req, res) {
  try {
    const result = await Job.delete(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Job offer not found" });
    res.json({ message: "Job offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
