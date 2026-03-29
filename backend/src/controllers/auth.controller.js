const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ============================
// Register Controller
// ============================

const registerController = async (req, res) => {
    try {

        const { fullName, mobile, email, password } = req.body;

        if (!fullName || !mobile || !email || !password) {
            return res.status(422).json({
                message: "All fields are required"
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User is already exists"
            });
        }

        const role = "user"

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            fullName,
            mobile,
            email,
            password: passwordHash,
            role
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: "none"
        });

        return res.status(201).json({
            success: true,
            message: "User register successfully",
            newUser: {
                id: newUser.id,
                fullName: newUser.fullName,
                mobile: newUser.mobile,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log("error in register user", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    };
};

// ======================
// Login Controller
// ======================

const loginController = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(409).json({
                message: "All fields are required"
            })
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'user is not found'
            })
        }

        const decrypt = await bcrypt.compare(password, user.password);

        if (!decrypt) {
            return res.status(401).json({
                message: "Invalid credenctials"
            })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: "none"
        });

        return res.status(200).json({
            success: true,
            message: "User LoggedIn successfully",
            user
        })

    } catch (error) {
        console.log("error in the login ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error
        });
    };
};

// ========================
// Logout Controller
// ========================

const logoutController = async (req, res) => {
    try {

        // const token = req.cookies?.token;

        // if (!token) {
        //     return res.status(404).json({
        //         message: "Token not found"
        //     })
        // }

        // res.clearCookie("token");

        res.cookie("token", "",{
            httpOnly:true,
            sameSite:"none",
            secure:"none"
        })

        return res.status(200).json({
            success: true,
            message: "user is logout"
        });

    } catch (error) {
        console.log("error in the logout ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    };
};

module.exports = { registerController, loginController, logoutController };