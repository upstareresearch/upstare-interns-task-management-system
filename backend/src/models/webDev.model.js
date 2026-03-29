const mongoose = require("mongoose");


const WebDevelopmentSchema = new mongoose.Schema({

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

}, {timestamps:true});

const webDevModel = mongoose.model("Web-Develoment-Tasks", WebDevelopmentSchema);

module.exports = webDevModel;

