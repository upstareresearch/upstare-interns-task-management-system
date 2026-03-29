const mongoose = require("mongoose");

const taskSubmissionSchema = new mongoose.Schema({

    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Interns-Task" },

    taskNumber: { type: String },

    gitHubLink: { type: String },

    documentationLink: { type: String },

    remarks: { type: String },

    internId: { type: mongoose.Schema.Types.ObjectId, ref: "Interns-Profile" },

    internName: { type: String },

    internEmail: { type: String },

    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },

    submittedAt: { type: Date, default: Date.now }

}, { timestamps: true })

const taskSubmissionModel = mongoose.model("Task-Submission", taskSubmissionSchema);

module.exports = taskSubmissionModel;