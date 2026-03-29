const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    fullName: { type: String, required: true },

    mobile: { type: String, required: true, minlenght: 10, maxlenght: 10, unique: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, minlenght: 8 },
    
    role: { type: String, default: "user", enum: ["user", "intern", "admin"] }

}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;