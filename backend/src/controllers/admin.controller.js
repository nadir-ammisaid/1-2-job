import db from "../config/connection.js";

export async function getAdminStats(req, res) {
  try {
    const usersCount = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) as count FROM user WHERE role = 'jobber'",
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0].count);
        }
      );
    });

    const companiesCount = await new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) as count FROM company", (err, results) => {
        if (err) reject(err);
        else resolve(results[0].count);
      });
    });

    const jobsCount = await new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) as count FROM job", (err, results) => {
        if (err) reject(err);
        else resolve(results[0].count);
      });
    });

    res.json({
      registeredJobbers: usersCount,
      registeredCompanies: companiesCount,
      registeredJobs: jobsCount,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await new Promise((resolve, reject) => {
      db.query(
        "SELECT id_user, first_name, last_name, email, phone, city, profession, role FROM user ORDER BY id_user DESC",
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getAllCompanies(req, res) {
  try {
    const companies = await new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM company ORDER BY id_company DESC",
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });

    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Failed to fetch companies" });
  }
}

export async function getAllJobsAdmin(req, res) {
  try {
    const jobs = await new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          j.*, 
          c.name as company_name,
          c.logo_path as company_logo,
          (SELECT COUNT(*) FROM application WHERE id_job = j.id_job) as applications_count
        FROM job j 
        LEFT JOIN company c ON j.id_company = c.id_company 
        ORDER BY j.date_posted DESC`,
        (err, results) => {
          if (err) reject(err);
          else resolve(results);
        }
      );
    });

    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}

export async function promoteToAdmin(req, res) {
  try {
    const { userId } = req.params;

    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET role = 'admin' WHERE id_user = ?",
        [userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    res.json({ message: "User promoted to admin successfully" });
  } catch (error) {
    console.error("Error promoting user:", error);
    res.status(500).json({ error: "Failed to promote user" });
  }
}

export async function demoteFromAdmin(req, res) {
  try {
    const { userId } = req.params;
    const currentAdminId = req.user.id_user;

    // Protection 1 : Un admin ne peut pas se rétrograder lui-même
    if (parseInt(userId) === currentAdminId) {
      return res.status(403).json({
        message: "You cannot demote yourself. Ask another admin to do it.",
      });
    }

    // Protection 2 : Vérifier qu'il reste au moins un autre admin
    const adminCountQuery = await new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) as count FROM user WHERE role = 'admin'",
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0].count);
        }
      );
    });

    if (adminCountQuery <= 1) {
      return res.status(403).json({
        message: "Cannot demote the last admin. Promote someone else first.",
      });
    }

    // Procéder à la rétrogradation
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET role = 'jobber' WHERE id_user = ?",
        [userId],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    res.json({ message: "User demoted to jobber successfully" });
  } catch (error) {
    console.error("Error demoting user:", error);
    res.status(500).json({ error: "Failed to demote user" });
  }
}
