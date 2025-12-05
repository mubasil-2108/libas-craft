const SpecialPackage = require("../models/specialPackage");
const Product = require("../models/product");
const asyncHandler = require('express-async-handler');
const { uploadFile, deleteFileFromDrive } = require("../utils/googleDriveOAuth");
const fs = require("fs");

async function uploadWithRetry(filePath, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await uploadFile(filePath);
        } catch (err) {
            console.error(`Upload attempt ${attempt} failed for ${filePath}:`, err.message);
            if (attempt === retries) throw err;
            await new Promise(res => setTimeout(res, attempt * 1000)); // exponential backoff
        }
    }
}

// CREATE SPECIAL PACKAGE

const createSpecialPackage = asyncHandler(async (req, res) => {
    const { packageName, packageDescription, packageProducts, packageRegularPrice, packageSalePrice } = req.body;

    if (!packageName || !packageDescription || !packageProducts, !packageRegularPrice) {
        return res.status(400).json({ message: "Products are required" });
    }

    // Validate product IDs
    const existingProducts = await Product.find({ _id: { $in: packageProducts } });
    if (existingProducts.length !== packageProducts.length) {
        return res.status(400).json({ message: "Some products do not exist" });
    }

    let imageData = null;

    if (!req.file) {
        return res.status(400).json({
            message: "Package image is required",
        });
    }

    const filePath = req.file.path;

    try {
        const uploaded = await uploadWithRetry(filePath);

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
            .json({ message: "Failed to upload package image" });
    }


    const package = await SpecialPackage.create({
        packageName,
        packageDescription,
        packageImage: imageData,
        packageProducts,
        packageRegularPrice,
        packageSalePrice
    })

    res.status(201).json({
        message: "Special package created successfully",
        data: package,
    })
});

// GET ALL SPECIAL PACKAGES

const getAllSpecialPackages = asyncHandler(async (req, res) => {
    const packages = await SpecialPackage.find().populate("packageProducts");

    res.status(200).json({
        packages,
    })
});

// GET SINGLE SPECIAL PACKAGE

const getSpecialPackage = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const package = await SpecialPackage.findById(id).populate("packageProducts");

    if (!package) {
        return res.status(404).json({
            message: "Special package not found"
        })
    }

    res.status(200).json({
        package,
    })
});

// UPDATE SPECIAL PACKAGE

const updateSpecialPackage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { packageName, packageDescription, packageProducts, packageRegularPrice, packageSalePrice } = req.body;

    const package = await SpecialPackage.findById(id);

    if (!package) {
        return res.status(404).json({
            message: "Special package not found"
        })
    }

    if (!packageName || !packageDescription || !packageProducts, !packageRegularPrice) {
        return res.status(400).json({ message: "Products are required" });
    }

    // Validate products
    const existingProducts = await Product.find({ _id: { $in: packageProducts } });
    if (existingProducts.length !== packageProducts.length) {
        return res.status(400).json({ message: "Some product IDs do not exist" });
    }

    // Handle Image
    if (req.file) {
        const filePath = req.file.path;

        try {
            const uploaded = await uploadWithRetry(filePath);

            if (package.packageImage?.id) {
                await deleteFileFromDrive(package.packageImage.id);
            }

            package.packageImage = {
                id: uploaded.id,
                name: uploaded.name,
                webContentLink: uploaded.webContentLink,
                webViewLink: uploaded.webViewLink,
            };

            await fs.promises.unlink(filePath);
        } catch (err) {
            console.error("Image upload error:", err);
            return res.status(500).json({ message: "Failed to upload package image" });
        }

        // Update other fields

        package.packageName = packageName;
        package.packageDescription = packageDescription;
        package.packageProducts = packageProducts;
        package.packageRegularPrice = packageRegularPrice;
        package.packageSalePrice = packageSalePrice;

        await package.save();

        res.status(200).json({
            message: "Special package updated successfully",
            data: package,
        });
    }
});

// DELETE SPECIAL PACKAGE

const deleteSpecialPackage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const package = await SpecialPackage.findById(id);

    if (package) {
        if (package.packageImage?.id) {
            await deleteFileFromDrive(package.packageImage.id);
        }
        await package.deleteOne();
        res.status(200).json({
            message: "Special package deleted successfully",
        });
    }
});

module.exports = {
    createSpecialPackage,
    getAllSpecialPackages,
    getSpecialPackage,
    updateSpecialPackage,
    deleteSpecialPackage
}