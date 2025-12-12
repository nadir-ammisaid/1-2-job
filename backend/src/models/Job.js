import db from "../config/connection.js";

export class Job {
  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          j.id_job,
          j.job_title,
          j.contract_type,
          j.short_description,
          j.full_description,
          j.salary,
          j.workplace_type,
          j.working_time,
          j.date_posted,
          c.id_company,
          c.name AS company_name,
          c.email AS company_email,
          c.phone AS company_phone,
          c.city AS company_city,
          c.sector AS company_sector,
          c.logo_path AS company_logo,
          c.description AS company_description
        FROM job AS j
        INNER JOIN company AS c ON j.id_company = c.id_company
        ORDER BY j.date_posted DESC
      `;

      db.query(sql, [], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM job WHERE id_job = ?", [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0]);
      });
    });
  }

  static create({
    job_title,
    contract_type,
    short_description,
    full_description,
    id_company,
  }) {
    return new Promise((resolve, reject) => {
      const sql = `
          INSERT INTO job (job_title, contract_type, short_description, full_description, id_company)
          VALUES (?, ?, ?, ?, ?)
        `;
      db.query(
        sql,
        [
          job_title,
          contract_type,
          short_description,
          full_description,
          id_company,
        ],
        (err, result) => {
          if (err) reject(err);
          else resolve({ id_job: result.insertId });
        }
      );
    });
  }

  static update(
    id,
    {
      job_title,
      contract_type,
      short_description,
      full_description,
      id_company,
    }
  ) {
    return new Promise((resolve, reject) => {
      const sql = `
          UPDATE job
          SET job_title = ?, contract_type = ?, short_description = ?, full_description = ?, id_company = ?
          WHERE id_job = ?
        `;
      db.query(
        sql,
        [
          job_title,
          contract_type,
          short_description,
          full_description,
          id_company,
          id,
        ],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM job WHERE id_job = ?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
