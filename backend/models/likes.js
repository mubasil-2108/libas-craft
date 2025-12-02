const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const likesSchema = new mongoose.Schema({
    // Product Likes
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("ProductLikes", likesSchema);