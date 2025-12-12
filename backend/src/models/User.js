import db from "../config/connection.js";

export class User {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user", (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  //Get user by ID
  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user WHERE id_user = ?", [id], (err, results) => {
        if (err) reject(err);
        else resolve(results[0] || null);
      });
    });
  }

  //Get user by email
  static getByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user where email = ?",
        [email],
        (err, results) => {
          if (err) reject(err);
          resolve(results[0] || null);
        }
      );
    });
  }

  static create({
    first_name,
    last_name,
    email,
    phone,
    city,
    profession,
    description,
    photo_path,
    hard_skills,
    soft_skills,
    password,
    role,
  }) {
    return new Promise((resolve, reject) => {
      const sql = `
                INSERT INTO user
                (first_name,
                last_name,
                email,
                phone,
                city,
                profession,
                description,
                photo_path,
                hard_skills,
                soft_skills,
                password,
                role)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [
          first_name,
          last_name,
          email,
          phone,
          city,
          profession,
          description,
          photo_path,
          hard_skills,
          soft_skills,
          password,
          role,
        ],
        (err, result) => {
          if (err) reject(err);
          else resolve({ id_user: result.insertId });
        }
      );
    });
  }

  //Update user information
  static update(id, updateData) {
    return new Promise((resolve, reject) => {
      const validFields = {};
      Object.keys(updateData).forEach((key) => {
        if (
          updateData[key] !== undefined &&
          updateData[key] !== null &&
          updateData[key] !== ""
        ) {
          validFields[key] = updateData[key];
        }
      });

      if (Object.keys(validFields).length === 0) {
        return resolve({ affectedRows: 0 });
      }

      const fields = Object.keys(validFields);
      const values = Object.values(validFields);

      const setClause = fields.map((field) => `${field} = ?`).join(", ");
      const sql = `UPDATE user SET ${setClause} WHERE id_user = ?`;

      values.push(id);

      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM user WHERE id_user = ?", [id], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
}
