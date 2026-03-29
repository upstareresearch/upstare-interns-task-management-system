const mongoose = require("mongoose");

const internsProfileSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    fullName: { type: String },

    domain: { type: String },

    email: { type: String, unique: true },

    password: { type: String },

    college: { type: String },

    mobile: { type: String, unique: true, minlength: 10, maxlength: 10, },

    location: { type: String },

    duration: { type: String },

    startingDate: { type: Date },

    endingDate: { type: Date },

    role: { type: String, default: "intern" }

}, { timestamps: true })

const internsProfileModel = mongoose.model("Interns-Profile", internsProfileSchema);

module.exports = internsProfileModel