const express = require("express");
const { allTaskCountController, submittedCountController, pendingTaskCountController, approvedCountController, rejectedTaskCountController, internSubmittedTaskController } = require("../controllers/dashboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


// ===========================
// All task count api
// ==========================
router.get("/all-task", allTaskCountController);

// ============================
// submitted task count api
// ===========================
router.get("/submitted/count", authMiddleware, submittedCountController);

// ============================
// pending task count api
// ===========================
router.get("/pending/count", authMiddleware, pendingTaskCountController);

// ============================
// approved task count api
// ===========================
router.get("/approved/count", authMiddleware, approvedCountController);

// ============================
// Rejected task count api
// ============================
router.get("/rejected/count", authMiddleware, rejectedTaskCountController);

// =====================================
// Intern submitted task fetching api
// =====================================
router.get("/submitted/get-all-task", authMiddleware, internSubmittedTaskController);

module.exports = router;