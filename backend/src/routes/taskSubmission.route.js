const express = require("express");
const { taskSubmissionController, submissionStatusController, fetchInternAllTasks } = require("../controllers/taskSubmission.controller");
const authMiddleware = require("../middlewares/auth.middleware");


const router = express.Router();

// ===========================
// Task submission api
// ==========================

router.post("/intern-task",authMiddleware, taskSubmissionController);

// ==============================
// Submission status api
// ===========================

router.get("/task-status/:taskId", authMiddleware, submissionStatusController);

// ==========================================
// fetching interns submitted all task api
// ===========================================

router.get("/intern-submitted/tasks/:internId", fetchInternAllTasks);


module.exports = router;