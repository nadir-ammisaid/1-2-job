import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import applicationRoutes from "./src/routes/application.routes.js";
import companyRoutes from "./src/routes/company.routes.js";
import jobRoutes from "./src/routes/job.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import cookieParser from "cookie-parser";
import adminRoutes from "./src/routes/admin.routes.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("!!! JWT_SECRET is required in .env file !!!");
  process.exit(1);
}

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://1-2-job.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use("/logos", express.static("public/logos"));

app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("🚀 1, 2, Job backend is running! We are the champions!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
