const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        trim: true,
        required: [true, 'Product name is required'],
    },
    productDescription: {
        type: String,
        trim: true,
        required: [true, 'Product description is required'],
    },
    productPhoto: [
        {
            id: { type: String },
            name: { type: String },
            status: { type: String, default: 'uploaded' },
            webContentLink: { type: String },
            webViewLink: { type: String }
        }
    ],
    category: {
        type: String,
        trim: true,
        required: [true, 'Product category is required'],
    },
    sku: {
        type: String,
        trim: true,
        required: [true, 'Product sku is required'],
    },
    stockQuantity: {
        type: Number,
        trim: true,
        required: [true, 'Product stock quantity is required'],
    },
    regularPrice: {
        type: Number,
        required: [true, 'Product regular price is required'],
    },
    salePrice: {
        type: Number,
        required: [true, 'Product sale price is required'],
    },
    sales: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        required: [true, 'Product tags are required'],
    }
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;