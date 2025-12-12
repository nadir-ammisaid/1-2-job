import mysql from "mysql2/promise";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function initDatabase() {
  try {
    console.log("Connecting to MySQL...");

    // Connect without specifying a database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT || 3306,
      multipleStatements: true,
    });

    console.log("Connected to MySQL");

    // Read SQL schema file
    console.log("Reading schema.sql...");
    const sql = fs.readFileSync("./schema.sql", "utf8");

    // Execute SQL script
    console.log("Executing SQL script...");
    await connection.query(sql);

    console.log("Database initialized successfully");
    console.log("All tables created");

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

initDatabase();
