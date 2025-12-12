import db from "../config/connection.js";

export class Application {
  // Get all applications for a user
  static getByUserId(userId) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          a.id_application,
          a.date_applied,
          a.message,
          a.resume_path,
          a.id_user,
          a.id_job,
          j.job_title,
          j.contract_type,
          c.name AS company_name,
          c.logo_path AS company_logo
        FROM application AS a
        INNER JOIN job AS j ON a.id_job = j.id_job
        INNER JOIN company AS c ON j.id_company = c.id_company
        WHERE a.id_user = ?
        ORDER BY a.date_applied DESC
      `;

      db.query(sql, [userId], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  // Count applications for a user
  static countByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) as count FROM application WHERE id_user = ?",
        [userId],
        (err, results) => {
          if (err) reject(err);
          else resolve(results[0].count);
        }
      );
    });
  }

  // Create an application
  static create({ message, resume_path, id_user, id_job }) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO application (message, resume_path, id_user, id_job)
        VALUES (?, ?, ?, ?)
      `;
      db.query(sql, [message, resume_path, id_user, id_job], (err, result) => {
        if (err) reject(err);
        else resolve({ id_application: result.insertId });
      });
    });
  }

  // Delete an application
  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query(
        "DELETE FROM application WHERE id_application = ?",
        [id],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
}
