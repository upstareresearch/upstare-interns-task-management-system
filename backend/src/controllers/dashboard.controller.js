const internsProfileModel = require("../models/internsProfile.model");
const taskModel = require("../models/task.model");
const taskSubmissionModel = require("../models/taskSubmission.model");

// ===================================
// fetching All task count controller
// ===================================

const allTaskCountController = async (req, res) => {
    try {

        const allTaskNumber = await taskModel.countDocuments();

        return res.status(200).json({
            success: true,
            message: "fetched all task successfully",
            allTaskNumber
        })

    } catch (error) {
        console.log("error while fetching task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
};

// =============================================
// fetching interns submitted task count
// ==============================================

const submittedCountController = async (req, res) => {
    try {

        const userId = req.user._id;

        const user = req.user;

        const internProfile = await internsProfileModel.findOne({ userId: userId });

        if (!internProfile) {
            return res.status(404).json({
                success: false,
                message: "Intern profile is not found"
            })
        }

        const submittedTasksCount = await taskSubmissionModel.countDocuments({ internId: internProfile._id });

        return res.status(200).json({
            success: true,
            message: "submitted task count successfully",
            submittedTasksCount,
            user
        })

    } catch (error) {
        console.log("error while fetching number of count", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
};


// ===============================
// Counting the pending task
// ===============================

const pendingTaskCountController = async (req, res) => {
    try {

        const userId = req.user._id;

        const internProfile = await internsProfileModel.findOne({ userId: userId });

        if (!internProfile) {
            return res.status(404).json({
                success: false,
                message: "Intern profile in not found"
            })
        }

        const pendingCount = await taskSubmissionModel.countDocuments({
            internId: internProfile._id,
            status: "pending"
        });

        return res.status(200).json({
            success: true,
            message: "pending count successfully",
            pendingCount
        });

    } catch (error) {
        console.log("error while counting pending task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
};


// ==================================
// Approved submission count api
// ==================================

const approvedCountController = async (req, res) => {
    try {

        const userId = req.user._id;

        const internProfile = await internsProfileModel.findOne({ userId: userId });

        if (!internProfile) {
            return res.status(404).json({
                success: false,
                message: "intern Profile is not found"
            })
        }

        const approvedCount = await taskSubmissionModel.countDocuments({
            internId: internProfile._id,
            status: "approved"
        })

        return res.status(200).json({
            success: true,
            message: "Approved task count successfully",
            approvedCount
        })

    } catch (error) {
        console.log("error while count approved submission", error);
        return res.status(500).json({
            success: false,
            message: "Inaternal server error",
            error: error
        })
    }
};

// =====================================
// Rejected task conut controller
// ====================================

const rejectedTaskCountController = async (req, res) => {
    try {
        const userId = req.user._id;

        const internProfile = await internsProfileModel.findOne({ userId: userId });

        if (!internProfile) {
            return res.status(404).json({
                success: false,
                message: "Intern Profile is not found"
            })
        }

        const rejectedCount = await taskSubmissionModel.countDocuments({
            internId: internProfile._id,
            status: "rejected"
        })

        return res.status(200).json({
            success: true,
            message: "Rejected count successfully",
            rejectedCount
        })

    } catch (error) {
        console.log("error white reject counting", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server error",
            error: error
        })
    }
};

// =============================
// Intern Submitted all task
// =============================

const internSubmittedTaskController = async (req, res) => {
    try {
        const userId = req.user._id;

        const internProfile = await internsProfileModel.findOne({ userId: userId });

        if (!internProfile) {
            return res.status(404).json({
                success: false,
                message: "Intern Profile is not found"
            })
        }

        const internAllTask = await taskSubmissionModel.find({ internId: internProfile._id });

        return res.status(200).json({
            success: true,
            message: "All task found successfully",
            internAllTask
        })

    } catch (error) {
        console.log("error while fetching intern task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
};


module.exports = {
    allTaskCountController,
    submittedCountController,
    pendingTaskCountController,
    approvedCountController,
    rejectedTaskCountController,
    internSubmittedTaskController
};