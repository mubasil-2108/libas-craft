const asyncHandler = require("express-async-handler");
const Setting = require("../models/setting");
const { uploadFile, deleteFileFromDrive } = require("../utils/googleDriveOAuth");
const fs = require("fs");

async function uploadWithRetry(filePath, folderName, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await uploadFile(filePath, folderName);
        } catch (err) {
            console.error(`Upload attempt ${attempt} failed for ${filePath}:`, err.message);
            if (attempt === retries) throw err;
            await new Promise(res => setTimeout(res, attempt * 1000)); // exponential backoff
        }
    }
}

/**
 * @desc    Get site settings
 * @route   GET /api/settings
 * @access  Public / Admin (as you prefer)
 */

const getSettings = asyncHandler(async (req, res) => {
    const settings = await Setting.findOne();

    if (!settings) {
        return res.status(200).json({
            success: true,
            data: null,
            message: "Settings not created yet",
        });
    }

    res.status(200).json({
        success: true,
        data: settings,
    });
})

/**
 * @desc    Create or Update site settings
 * @route   POST /api/settings
 * @access  Admin
 */
// const upsertSettings = asyncHandler(async (req, res) => {
//     const payload = req.body;

//     let settings = await Setting.findOne();

//     if (settings) {
//         // Update existing settings
//         settings = await Setting.findByIdAndUpdate(
//             settings._id,
//             payload,
//             { new: true, runValidators: true }
//         );
//     } else {
//         // Create settings for the first time
//         settings = await Setting.create(payload);
//     }

//     res.status(200).json({
//         success: true,
//         message: "Settings saved successfully",
//         data: settings,
//     });
// });

const upsertSettings = asyncHandler(async (req, res) => {
    const settings = await Setting.findOneAndUpdate(
        {},
        req.body,
        { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        message: "Settings saved successfully",
        data: settings,
    });
});

/**
 * @desc    Update site settings
 * @route   PATCH /api/settings
 * @access  Admin
 */

const updateSiteSettings = asyncHandler(async (req, res) => {
    const { name, headline, description, keywords, address, phone, email } = req.body;
    let logoData = null;

    // if (!req.file) {
    //     return res.status(400).json({
    //         message: "Site logo is required",
    //     });
    // }

    if (req.file) {
    const filePath = req.file.path;

    try {
        const uploaded = await uploadWithRetry(filePath, "siteLogo");
        // get existing settings only if needed
            const existingSettings = await Setting.findOne();
            if (existingSettings?.site?.logo?.id) {
                await deleteFileFromDrive(existingSettings.site.logo.id);
            }
        logoData = {
            id: uploaded.id,
            name: uploaded.name,
            webContentLink: uploaded.webContentLink,
            webViewLink: uploaded.webViewLink,
        };

        // Delete temp file
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error("Image upload error:", err);
        return res
            .status(500)
            .json({ message: "Failed to upload site logo" });
    }
   }
    const settings = await Setting.findOneAndUpdate(
        {},
        {
            ...(logoData && { "site.logo": logoData }),
            ...(name && { "site.name": name }),
            ...(headline && { "": headline }),
            ...(description && { "site.description": description }),
            ...(keywords && { "site.keywords": keywords }),
            ...(address && { "site.address": address }),
            ...(phone && { "site.phone": phone }),
            ...(email && { "site.email": email }),
        },
        { new: true, runValidators: true, upsert: true } // Return the updated document
    )

    res.status(200).json({
        success: true,
        message: "Site settings updated",
        data: settings,
    });
});


/**
 * @desc    Update social links only
 * @route   PATCH /api/settings/social-links
 * @access  Admin
 */

const updateSocialLinks = asyncHandler(async (req, res) => {
    const { whatsapp, facebook, snapchat, tiktok, instagram } = req.body;

    const settings = await Setting.findOneAndUpdate(
        {},
        {
            ...(whatsapp && { "social.whatsapp": whatsapp }),
            ...(facebook && { "social.facebook": facebook }),
            ...(snapchat && { "social.snapchat": snapchat }),
            ...(tiktok && { "social.tiktok": tiktok }),
            ...(instagram && { "social.instagram": instagram }),
        },
        { new: true, runValidators: true, upsert: true } // Return the updated document
    )
    res.status(200).json({
        success: true,
        message: "Social links updated",
        data: settings,
    });
});

/**
 * @desc    Update deal modal content
 * @route   PATCH /api/settings/deal-modal
 * @access  Admin
 */

const updateDealModal = asyncHandler(async (req, res) => {
    const { headline, description } = req.body;

    let imageData = null;

    if (!req.file) {
        return res.status(400).json({
            message: "Deal Imagw is required",
        });
    }

    const filePath = req.file.path;

    try {
        const uploaded = await uploadWithRetry(filePath, 'newDealImage');

        imageData = {
            id: uploaded.id,
            name: uploaded.name,
            webContentLink: uploaded.webContentLink,
            webViewLink: uploaded.webViewLink,
        };

        // Delete temp file
        await fs.promises.unlink(filePath);
    } catch (err) {
        console.error("Image upload error:", err);
        return res
            .status(500)
            .json({ message: "Failed to upload New Deal Image" });
    }

    const settings = await Setting.findOneAndUpdate(
        {},
        {
            ...(imageData && { "modal.image": imageData }),
            ...(headline && { "modal.headline": headline }),
            ...(description && { "modal.description": description }),
        },
        { new: true, runValidators: true, upsert: true } // Return the updated document
    );

    res.status(200).json({
        success: true,
        message: "Deal modal updated",
        data: settings,
    });
});

const updateNote = asyncHandler(async (req, res) => {
    const { note } = req.body;
    const settings = await Setting.findOneAndUpdate(
        {},
        {
            note,
        },
        { new: true, runValidators: true, upsert: true } // Return the updated document
    )
    res.status(200).json({
        success: true,
        message: "Note updated",
        data: settings,
    });
});


module.exports = {
    getSettings,
    upsertSettings,
    updateSiteSettings,
    updateSocialLinks,
    updateDealModal,
    updateNote
}