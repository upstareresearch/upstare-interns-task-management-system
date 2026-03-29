const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

// =========================
// auth middleware
// =========================

const authMiddleware = async(req, res , next)=>{
    try {

        const token = req.cookies?.token;
         
        if(!token){
            return res.status(404).json({
                message:'Token is not found'
            })
        }

        const decoded = jwt.decode(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(403).json({
                message:"Token is invalid"
            })
        }

        const user = await userModel.findById(decoded.id);

        req.user = user;

        next();
        
    } catch (error) {
        console.log("error in the auth Middleware", error);
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error,
        });
    };
};

module.exports = authMiddleware;