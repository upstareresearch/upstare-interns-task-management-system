const express = require("express");
const { registerController, loginController, logoutController } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// ===================================
// fetching the current user
// ================================

router.get("/me", authMiddleware, (req, res) => {

    return res.status(200).json({
        message:"user is logged in",
        user:req.user
    
    })
});


// =========================
// Register Api
// =========================

router.post("/register", registerController);

// =========================
// Login Api
// =========================

router.post("/login", loginController);

// =========================
// Logout Api
// =========================

router.get("/logout", authMiddleware, logoutController);

module.exports = router;