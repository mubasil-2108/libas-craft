const asyncHandler = require('express-async-handler');
const ProductLikes = require("../models/likes");

// Get likes for a product

const getLikes = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        let productLikes = await ProductLikes.findOne({ product: productId });
        if (!productLikes) {
            return res.status(200).json({ likesCount: 0 });
        }
        res.status(200).json({ likesCount: productLikes.likesCount });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Add a like

const addLike = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        const productLikes = await ProductLikes.findOneAndUpdate(
            { product: productId },
            { $inc: { likesCount: 1 } },
            { new: true, upsert: true }
        );
        res.status(200).json({ likesCount: productLikes.likesCount });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

// Remove a like

const removeLike = asyncHandler(async (req, res) => {
    try {
        const { productId } = req.params;
        const productLikes = await ProductLikes.findOneAndUpdate(
            { product: productId },
            { $inc: { likesCount: -1 } },
            { new: true }
        );

        if (!productLikes) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (productLikes.likesCount < 0) {
            productLikes.likesCount = 0;
            await productLikes.save();
        }

        res.status(200).json({ likesCount: productLikes.likesCount });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


module.exports = {
    getLikes,
    addLike,
    removeLike,
}