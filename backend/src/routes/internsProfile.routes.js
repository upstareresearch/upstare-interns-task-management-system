const express = require("express");
const { internsProfileController, fetchSingleInternProfile } = require("../controllers/internsProfile.controller");


const router = express.Router();

// ===============================
// Interns profile creating api
// ==============================

router.post("/profile-create",internsProfileController);

// ==================================
// Single inten profile fetching api
// ===================================

router.get("/single-profile/:internId", fetchSingleInternProfile);



module.exports = router;