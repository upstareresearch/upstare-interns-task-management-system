const taskModel = require("../models/task.model");
const taskSubmissionModel = require("../models/taskSubmission.model");

// =======================
// Delete task controller
// =======================

const deletedTaskController = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await taskModel.findById(taskId);

        await task.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })

    } catch (error) {
        console.log("error while deleting task", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
}

// =======================================
// Admin task aproval controller
// ========================================

const taskApprovelController = async (req, res) => {
    try {
        const { taskId, status } = req.body;

        if (!taskId || !status) {
            return res.status(400).json({
                success: false,
                message: 'All field are required'
            })
        }

        if (!["approved", "rejected"].includes(status)) {
            return res.state(400).json({
                success: false,
                message: "Invalid status"
            })
        }

        const submission = await taskSubmissionModel.findById(taskId);

        if (!submission) {
            return res.status(404).json({
                success: false,
                messsage: "submitted task not found"
            })
        }

        if (submission.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: "task already submitted"
            })
        }

        submission.status = status;
        submission.reviewedAt = new Date();

        await submission.save();

        return res.status(200).json({
            success: true,
            message: "task status updated",
            submission
        })

    } catch (error) {
        console.log("error while approval ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        })
    }
};


module.exports = { deletedTaskController, taskApprovelController };