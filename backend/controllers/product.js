const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const { uploadFileToDrive, deleteFileFromDrive } = require("../utils/googleDrive");

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

    // Upload images to Google Drive and get URLs

    let productPhoto = [];
    if (req.files && req.files.length > 0) {
        for (let file of req.files) {
            const fileUrl = await uploadFileToDrive(file);
            productPhoto.push(fileUrl);
        }
    }


    const product = await Product.create({
        productName,
        productDescription,
        productPhoto,
        category,
        sku,
        stockQuantity,
        regularPrice,
        salePrice,
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

        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const fileUrl = await uploadFileToDrive(file);
                product.productPhoto.push(fileUrl); // push new { fileId, url }
            }
        }

        // Remove images if specified in req.body.removeImages (array of fileIds)

        if (req.body.removeImages && req.body.removeImages.length > 0) {
            for (let img of req.body.removeImages) {
                await deleteFileFromDrive(img.fileId);
                product.productPhoto = product.productPhoto.filter(
                    (p) => p.fileId !== img.fileId
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
            await deleteFileFromDrive(img.fileId);
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

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    searchProducts,
    deleteProduct
}