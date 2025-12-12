import db from "../config/connection.js";

export class Company{

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM company", (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    static getById(id) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM company WHERE id_company = ?", [id],(err, results) => {
                if(err) reject(err);
                else resolve(results);
            })
        })
    }

    static create({
        logo_path,
        name,
        sector,
        email,
        phone,
        city,
        description
    }){
        return new Promise((resolve, reject) =>{
            const sql = `
                INSERT INTO company (name, email, phone, city, sector, logo_path, description)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `;
            db.query(
                sql,
                [
                    name,
                    email,
                    phone,
                    city,
                    sector,
                    logo_path,
                    description
                ],
                (err, result) => {
                    if(err) reject(err);
                    else resolve({ id_company: result.insertId })
                }
            )
        })
    }

    static update(
        id,
        {
        logo_path,
        name,
        sector,
        email,
        phone,
        city,
        description
    }){
        return new Promise((resolve, reject) => {
            const sql = `
            UPDATE company
            SET
            name = ?,
            email = ?,
            phone = ?,
            city = ?,
            sector = ?,
            logo_path = ?,
            description = ?
            WHERE id_company = ?
            `;
        db.query(
            sql,
            [
                name,
                email,
                phone,
                city,
                sector,
                logo_path,
                description,
                id
            ],
            (err, result) => {
                if(err) reject(err);
                else resolve(result);
            }
        )
        })
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM company WHERE id_company = ?", [id], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        })
    }
}