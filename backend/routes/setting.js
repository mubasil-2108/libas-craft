const express = require('express');
const router = express.Router();
const { getSettings, updateDealModal, updateSocialLinks, updateSiteSettings, updateNote, upsertSettings } = require('../controllers/setting');
const upload = require('../middlewares/upload');

// GET settings
router.get("/", getSettings);

// CREATE / UPDATE all settings
router.post("/", upsertSettings);

// Partial updates
router.patch("/social-links" , updateSocialLinks);
router.patch("/deal-modal", upload.single("images"), updateDealModal);
router.patch("/site-settings", upload.single("images"), updateSiteSettings);
router.patch("/note", updateNote);

module.exports = router;

