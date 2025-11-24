const asyncHandler = require("express-async-handler");
const Review = require('../models/reviews');
const fs = require("fs");
const { uploadFile } = require("../utils/googleDriveOAuth");

async function uploadWithRetry(filePath, retries = 3) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await uploadFile(filePath, "reviews");
        } catch (err) {
            console.error(`Upload attempt ${attempt} failed for ${filePath}:`, err.message);
            if (attempt === retries) throw err;
            await new Promise(res => setTimeout(res, attempt * 1000)); // exponential backoff
        }
    }
}

// ==========================================
// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
// ==========================================

const createReview = asyncHandler(async (req, res) => {
    const { user, product, title, rating, comment } = req.body;

    if (!user || !product || !rating) {
        return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const photo = [];

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

    const newReview = new Review({
        user,
        product,
        title,
        rating,
        comment,
        images: photo,
    });

    const savedReview = await newReview.save();
    if (!savedReview) {
        return res.status(500).json({ message: "Failed to create review" });
    }
    res.status(201).json(savedReview);
});

// ==========================================
// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
// ==========================================

const getAllReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find()
        .populate('user', 'name email')
        .populate('product', 'productName sku');

    res.json(reviews);
});

// ==========================================
// @desc    Get single review by ID
// @route   GET /api/reviews/:id
// @access  Public
// ==========================================

const getReviewById = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id)
        .populate('user', 'name email')
        .populate('product', 'productName sku');

    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
});

// ==========================================
// @desc    Get reviews by product
// @route   GET /api/reviews/product/:productId
// @access  Public
// ==========================================

const getReviewsByProduct = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId })
        .populate('user', 'name email');

    if (!reviews || reviews.length === 0) {
        return res.status(404).json({ message: "No reviews found for this product" });
    }
    res.status(200).json(reviews);
});

// ==========================================
// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
// ==========================================

const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) {
        return res.status(404).json({ message: "Review not found" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
});


module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    getReviewsByProduct,
    deleteReview,
}