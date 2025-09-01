const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const USER = require("../models/user");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill in all required fields"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password should be at least 6 characters long"
        });
    }

    const checkUser = await USER.findOne({ email });

    if (checkUser) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const createUser = await USER.create({
        name,
        email,
        password,
    })

    const token = generateToken(checkUser?._id);

    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        sameSite: 'none',
        secure: true, // Set to true if using HTTPS
    })

    if (createUser) {
        const { _id, name, email, photo, phone } = createUser;
        res.status(201).json({
            _id,
            name,
            email,
            photo,
            phone,
            token,
        })
    } else {
        res.status(400).json({
            message: "User registration failed"
        });
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill in all required fields"
        });
    }

    const checkUser = await USER.findOne({ email });

    if (!checkUser) {
        return res.status(400).json({
            message: "User does not exist. Please sign up"
        });
    }

    const isPasswordMatched = await bcrypt.compare(password, checkUser.password);

    const token = generateToken(checkUser?._id);

    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        sameSite: 'none',
        secure: true, // Set to true if using HTTPS
    })

    if (checkUser && isPasswordMatched) {
        const { _id, name, email, photo, phone } = checkUser;

        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            token,
        })
    } else {
        res.status(400).json({
            message: "Invalid email or password"
        });
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true, // Set to true if using HTTPS
    })

    return res.status(200).json({
        message: "Successfully logged out"
    });
})

const getUser = asyncHandler(async (req, res) => {
    
    const user = await USER.findById(req.user._id).select("-password");;

    if (user) {
        const { _id, name, email, photo, phone } = user;

        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
        })
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
})

const loginStatus = asyncHandler(async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json(false);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified) {
        return res.json(true);
    }

    return res.json(false);
})

const updateUser = asyncHandler(async (req, res) => {

    const user = await USER.findById(req.user._id);

    if (user) {
        const { name, email, photo, phone } = user;
        user.email = email;
        user.name = req.body.name || name;
        user.photo = req.body.photo || photo;
        user.phone = req.body.phone || phone;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            phone: updatedUser.phone,
        })
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
})

const changePassword = asyncHandler(async (req, res) => {

    const user = await USER.findById(req.user._id);

    const { oldPassword, password } = req.body;

    if (!user) {
        return res.status(404).json({
            message: "User not found, please sign up"
        });
    }

    if (!oldPassword || !password) {
        return res.status(400).json({
            message: "Please fill in all required fields"
        });
    }

    const isPasswordMatched = await bcrypt.compare(oldPassword, user?.password);

    if (user && isPasswordMatched) {
        user.password = password;
        await user.save();

        res.status(200).json({
            message: "Password changed successfully"
        });
    } else {
        res.status(400).json({
            message: "Old password is incorrect"
        });
    }
})

const forgotPassword = asyncHandler(async (req, res) => {

    const { email } = req.body;

    const checkUser = await USER.findOne({ email });

    if (!checkUser) {
        return res.status(404).json({
            message: "User not found, please sign up"
        });
    }

    let token = await Token.findOne({ userId: checkUser._id });
    if (token) {
        await token.deleteOne();
    }

    const resetToken = crypto.randomBytes(32).toString('hex') + checkUser._id;
    console.log(resetToken);

    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    await new Token({
        userId: checkUser._id,
        token: hashedToken,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes 
    }).save();

    const resetURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    // Reset Email
    const message = `
      <h2>Hello ${checkUser.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>

      <a href=${resetURL} clicktracking=off>${resetURL}</a>

      <p>Regards...</p>
      <p>Liba's Craft Team</p>
    `;

    const subject = "Password Reset Request";
    const send_to = checkUser.email;
    const send_from = process.env.EMAIL_USER;

    try {
        await sendEmail(subject, message, send_to, send_from);
        res.status(200).json({
            message: "Reset email sent to your email account"
        });
    } catch (error) {
        res.status(500).json({
            message: "Email not sent, please try again"
        });
    }
});

const resetpassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { resetToken } = req.params;

    const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Find token in db
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: { $gt: Date.now() },
    })

    if (!userToken) {
        return res.status(404).json({
            message: "Invalid or expired token"
        });
    }

    const checkUser = await USER.findOne({ _id: userToken.userId });
    checkUser.password = password;

    await checkUser.save();

    res.status(200).json({
        message: "Password reset successful, please login"
    });
});

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetpassword,
}