const express = require('express');
const router = express.Router();
const { sendContactToWhatsapp } = require('../controllers/contact');

// Public route: send message to WhatsApp
router.post('/', sendContactToWhatsapp);

module.exports = router;
