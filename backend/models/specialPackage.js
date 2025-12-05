const mongoose = require('mongoose');

const specialPackageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        trim: true,
        required: [true, 'Package name is required'],
    },
    packageDescription: {
        type: String,
        trim: true,
        required: [true, 'Package description is required'],
    },
    packageRegularPrice: {
        type: Number,
        required: [true, 'Package regular price is required'],
    },
    packageSalePrice: {
        type: Number,
        required: [true, 'Package sale price is required'],
    },
    packageImage: {
        id: { type: String },
        name: { type: String },
        status: { type: String, default: 'uploaded' },
        webContentLink: { type: String },
        webViewLink: { type: String }
    },
    packageProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    ]
}, { timestamps: true });

const SpecialPackage = mongoose.model("SpecialPackage", specialPackageSchema);
module.exports = SpecialPackage;