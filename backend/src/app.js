const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const cors = require("cors");
const taskUploaderRouter = require("./routes/taskUploader.routes");
const TaskSubmissionRouter = require("./routes/taskSubmission.route");
const DashboardRouter = require("./routes/dashboard.routes");
const AdminDashboardRouter = require("./routes/adminDashboard.routes");
const InternsProfileRouter = require("./routes/internsProfile.routes");


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// ================================
// epress for read the json data
// =================================
app.use(express.json());

// ===================================
// Cookie parser to read the cookies
// ====================================
app.use(cookieParser());

// ========================
// Auth Apis
// ========================
app.use("/api/auth", authRouter);

// ==========================
// Admin Task uploader Apis
// =========================
app.use("/api/admin", taskUploaderRouter);

// ============================
// Task submission Apis
// ============================
app.use("/api/submission", TaskSubmissionRouter);

// ==========================
// Admin dashboard Apis
// ==========================
app.use("/api/admin/dashboard", AdminDashboardRouter);

// =========================
// Interns Dashboard APis
// =========================
app.use("/api/dashboard", DashboardRouter);

// =========================
// Interns Profile Apis
// =========================
app.use("/api/interns", InternsProfileRouter);


module.exports = app;