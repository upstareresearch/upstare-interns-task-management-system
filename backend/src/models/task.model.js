const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: { type: String, },

    taskNumber: { type: String, unique: true },

    theoryConcepts: { type: String },

    handOnPractice: { type: String },

    projectTitle: { type: String }, 

    technicalRequirements: { type: String },

    stepByStep: { type: String },

    sampleOutput: { type: String, default: "" },

    submissions: { type: String },

    tipResources: { type: String }

}, { timestamps: true })

const taskModel = mongoose.model("Interns-Task", taskSchema);

module.exports = taskModel;