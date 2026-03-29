const express = require("express");
const { createTaskController, taskCodeController, getAllTaskController, singleTaskController } = require("../controllers/taskUploader.controller");


const router = express.Router();

// ==============================
// create task for task details 
// ===============================

router.post("/task-uploader", createTaskController);

// ===============================
// task code uploader api
// =============================

router.patch("/task-code-uploader", taskCodeController);

// ======================================
// fetching all task for interns api
// ======================================

router.get("/all-task", getAllTaskController);


// =============================
// fetching single task api
// =============================

router.get("/single-task/:id", singleTaskController);

module.exports = router;