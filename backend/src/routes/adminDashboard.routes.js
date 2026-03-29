const express = require("express");
const { deletedTaskController, taskApprovelController } = require("../controllers/adminDashboard.controller");
const { getAllInternsProfileController } = require("../controllers/internsProfile.controller");

const router = express.Router();


// ===========================
// Task delete api
// ==========================
router.delete("/delete-task/:taskId", deletedTaskController);

// ===============================
// fetching all interns profile
// ================================

router.get("/fetch-all-interns", getAllInternsProfileController);


// ===========================
// Approval api
// ===========================

router.patch("/task/approval", taskApprovelController);

module.exports = router;