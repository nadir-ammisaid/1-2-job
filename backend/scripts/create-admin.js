import bcrypt from "bcryptjs";
import db from "../src/config/connection.js";
import dotenv from "dotenv";

// Déterminer quel fichier .env charger
const envFile = process.argv[2] === "railway" ? ".env.railway" : ".env";
dotenv.config({ path: envFile });

console.log(`📂 Using environment file: ${envFile}\n`);

async function createAdmin() {
  const adminData = {
    first_name: process.env.ADMIN_FIRST_NAME,
    last_name: process.env.ADMIN_LAST_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  };

  if (
    !adminData.first_name ||
    !adminData.last_name ||
    !adminData.email ||
    !adminData.password
  ) {
    console.error("❌ Missing admin credentials in environment variables!");
    console.error(
      "Please set: ADMIN_FIRST_NAME, ADMIN_LAST_NAME, ADMIN_EMAIL, ADMIN_PASSWORD"
    );
    process.exit(1);
  }

  try {
    console.log("🔍 Checking if admin exists...");

    const checkQuery = "SELECT * FROM user WHERE email = ?";
    db.query(checkQuery, [adminData.email], async (err, results) => {
      if (err) {
        console.error("❌ Error checking admin:", err);
        process.exit(1);
      }

      if (results.length > 0) {
        console.log("✅ Admin user already exists!");
        console.log("📧 Email:", adminData.email);
        process.exit(0);
      }

      console.log("🔐 Hashing password...");
      const hashedPassword = await bcrypt.hash(adminData.password, 10);

      console.log("💾 Creating admin user...");
      const insertQuery = `
        INSERT INTO user (first_name, last_name, email, password, role)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [
          adminData.first_name,
          adminData.last_name,
          adminData.email,
          hashedPassword,
          adminData.role,
        ],
        (err, result) => {
          if (err) {
            console.error("❌ Error creating admin:", err);
            process.exit(1);
          }

          console.log("\n✅ Admin user created successfully!");
          console.log("📧 Email:", adminData.email);
          console.log("🔑 Password:", adminData.password);
          console.log("\n⚠️  IMPORTANT:");
          console.log("   1. Change this password after first login");
          console.log(
            "   2. Delete ADMIN_* variables from",
            envFile,
            "for security\n"
          );
          process.exit(0);
        }
      );
    });
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

createAdmin();
