const mongoose = require("mongoose");


const digitalMarketingSchema = new mongoose.Schema({

    title: { type: String, },

    taskNumber: { type: String, unique: true },

    theoryConcepts: { type: String },

    handOnPractice: { type: String },

    projectTitle: { type: String },

    technicalRequirements: { type: String },

    stepByStep: { type: String },

    sampleOutput: { type: String, default: "" },

    submissions: { type: String },

    tipResources: { type: String },

    domain: { type: String, required: true, enum:["webDevelopments", "digitalMarketings", "uiuxDesigns", "dataAnalytics"]}

}, { timestamps: true });

const digitalMarkingModel = mongoose.model("Digital-Marketing-Tasks", digitalMarketingSchema);

module.exports = digitalMarkingModel;