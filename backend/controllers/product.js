const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
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

const createProduct = asyncHandler(async (req, res) => {
    const {
        productName,
        productDescription,
        category,
        sku,
        stockQuantity,
        regularPrice,
        salePrice,
        tags
    } = req.body;

    if (
        !productName || !productDescription || !category || !sku || !stockQuantity ||
        !regularPrice || !salePrice || !tags
    ) {
        return res.status(400).json({
            message: "Please fill in all required fields"
        });
    }

    const ckeckProduct = await Product.findOne({ sku });
    if (ckeckProduct) {
        return res.status(400).json({
            message: "Product with this SKU already exists"
        });
    }
    const stockQuantityNum = parseInt(stockQuantity);
    const regularPriceNum = parseFloat(regularPrice);
    const salePriceNum = parseFloat(salePrice);
    // Upload images to Google Drive and get URLs

    let photo = [];
    if (req.files && req.files.length > 0) {
        for (let file of req.files) {
            console.log("Processing file:", file.originalname);
            const filePath = file.path; // multer stores file on disk
            try {
                // 1. Upload first
                const fileUrl = await uploadWithRetry(filePath);

                // 2. Push into array
                photo.push({
                    id: fileUrl.id,
                    name: fileUrl.name,
                    webContentLink: fileUrl.webContentLink,
                    webViewLink: fileUrl.webViewLink,
                });

                // 3. Delete local temp file AFTER upload is done
                await fs.promises.unlink(filePath);
                console.log(`Deleted local file: ${filePath}`);
            } catch (err) {
                console.error(`Error uploading or deleting ${filePath}:`, err);
            }
        }
    } else {
        return res.status(400).json({
            message: "Product photo is required"
        });
    }

    const product = await Product.create({
        productName,
        productDescription,
        productPhoto: photo,
        category,
        sku,
        stockQuantity: stockQuantityNum,
        regularPrice: regularPriceNum,
        salePrice: salePriceNum,
        tags
    });

    if (product) {
        res.status(201).json({
            message: 'Product added sucessfully!'
        })
    } else {
        res.status(400).json({
            message: 'Product not added'
        })
    }
});

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (!products) {
        return res.status(404).json({
            message: "No products found"
        });
    }

    res.status(200).json({
        products
    });
});

// snapshots || Filters || Search

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json({
        product
    });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
        const { productName, productDescription, category, sku, stockQuantity, regularPrice,
            salePrice, tags } = product;

        // Upload new images to Google Drive and get URLs
        // Append new URLs to existing productPhoto array

        // if (req.files && req.files.length > 0) {
        //     for (let file of req.files) {
        //         const fileUrl = await uploadFile(file);
        //         product.productPhoto.push(fileUrl); // push new { fileId, url }
        //     }
        // }

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                console.log("Processing file:", file.originalname);
                const filePath = file.path; // multer stores file on disk
                try {
                    // 1. Upload first
                    const fileUrl = await uploadWithRetry(filePath);

                    // 2. Push into array
                    product.productPhoto.push({
                        id: fileUrl.id,
                        name: fileUrl.name,
                        webContentLink: fileUrl.webContentLink,
                        webViewLink: fileUrl.webViewLink,
                    });

                    // 3. Delete local temp file AFTER upload is done
                    await fs.promises.unlink(filePath);
                    console.log(`Deleted local file: ${filePath}`);
                } catch (err) {
                    console.error(`Error uploading or deleting ${filePath}:`, err);
                }
            }
        } else {
            return res.status(400).json({
                message: "Product photo is required"
            });
        }

        // Remove images if specified in req.body.removeImages (array of fileIds)

        if (req.body.removeImages && req.body.removeImages.length > 0) {
            for (let img of req.body.removeImages) {
                await deleteFileFromDrive(img.id);
                product.productPhoto = product.productPhoto.filter(
                    (p) => p.id !== img.id
                )
            }
        }

        product.productName = req.body.productName || productName;
        product.productDescription = req.body.productDescription || productDescription;
        product.category = req.body.category || category;
        product.sku = req.body.sku || sku;
        product.stockQuantity = req.body.stockQuantity || stockQuantity;
        product.regularPrice = req.body.regularPrice || regularPrice;
        product.salePrice = req.body.salePrice || salePrice;
        product.tags = req.body.tags || tags;

        const updatedProduct = await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct
        })
    } else {
        return res.status(404).json({
            message: "Product not found"
        });
    }
})

const searchProducts = asyncHandler(async (req, res) => {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === "") {
        return res.status(400).json({
            message: "Search keyword is required"
        });
    }

    const products = await Product.find({
        $or: [
            { productName: { $regex: keyword, $options: "i" } },
            { productDescription: { $regex: keyword, $options: "i" } },
            { category: { $regex: keyword, $options: "i" } },
            { tags: { $regex: keyword, $options: "i" } }
        ]
    });

    if (products.length === 0) {
        return res.status(404).json({
            message: "No products found"
        });
    }

    res.status(200).json({
        products
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
        for (let img of product.productPhoto) {
            await deleteFileFromDrive(img.id);
        }
        await product.deleteOne();

        res.status(200).json({
            message: "Product deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
})

const deleteProductImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product) {
        const { fileId } = req.body;
        await deleteFileFromDrive(fileId);
        product.productPhoto = product.productPhoto.filter(
            (p) => p.id !== fileId
        )
        await product.save();

        res.status(200).json({
            message: "Product image deleted successfully"
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
})

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    searchProducts,
    deleteProduct,
    deleteProductImage
}