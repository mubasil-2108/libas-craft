const express = require('express');
const { registerUser, loginUser, logoutUser, getUser, updateUser, changePassword, forgotPassword, resetpassword, loginStatus } = require('../controllers/auth');
const protect = require('../middlewares/auth');

const router = express.Router();

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