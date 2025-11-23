const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.Mixed,
            required: true,
            set: v => Types.ObjectId.isValid(v) ? new Types.ObjectId(v) : v,
        },
        product: {
            type: Schema.Types.Mixed,
            required: true,
            set: v => Types.ObjectId.isValid(v) ? new Types.ObjectId(v) : v,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true,
        },
        title: {
            type: String,
            trim: true,
        },
        comment: {
            type: String,
            trim: true,
        },
        images: [
            {
                id: { type: String, },
                name: { type: String },
                webContentLink: { type: String },
                webViewLink: { type: String },
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

module.exports = mongoose.model('Review', reviewSchema);
