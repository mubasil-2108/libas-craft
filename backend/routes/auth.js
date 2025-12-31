// routes/auth.js
const express = require('express');
const passport = require('passport');
const { registerUser, loginUser, logoutUser, getUser,  updateUser, googleAuthSuccess, changePassword, forgotPassword, resetpassword, loginStatus } = require('../controllers/auth');
const protect = require('../middlewares/auth');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleAuthSuccess);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', protect, getUser);
router.get('/loggedin', loginStatus);
router.patch('/updateuser',protect, updateUser);
router.patch('/changepassword', protect, changePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetpassword);

module.exports = router;