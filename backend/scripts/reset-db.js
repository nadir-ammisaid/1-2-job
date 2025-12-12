import fs from "fs";
import readline from "readline";
import mysql from "mysql2";
import dotenv from "dotenv";

// dotenv.config();
dotenv.config({ path: "./backend/.env" });

const sql = fs.readFileSync("./backend/schema.sql", "utf8");

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  "⚠️  Warning: this action will DELETE and RECREATE the entire database!"
);
readLine.question("Are you sure you want to continue? (Y/n) ", (answer) => {
  const confirm = answer.trim().toLowerCase();

  if (confirm === "y") {
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      multipleStatements: true,
    });

    db.query(sql, (error) => {
      if (error) {
        console.error("❌ Error while resetting the database:", error.message);
      } else {
        console.log("✅ Database successfully recreated!");
      }
      db.end();
      readLine.close();
    });
  } else {
    console.log("❎ Operation canceled. Database was not modified.");
    readLine.close();
  }
});
