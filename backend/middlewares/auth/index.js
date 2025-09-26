const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const USER = require("../../models/user");

// Protect routes

const protect = asyncHandler(async (req, res, next) => {
    try {
        let token = req.cookies.token;
        if(!token){
            res.status(401).json({
                message: "Not authorized, please login"
            });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        const user = await USER.findById(verified.id).select("-password");

        if(!user){
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({
            message: "Not authorized, please login"
        });
    }
});

module.exports = protect;