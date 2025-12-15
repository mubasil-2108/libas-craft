const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const orderSchema = new mongoose.Schema({
    // Reference to the user who placed the order
    user: {
        type: Schema.Types.Mixed,
        required: true,
        set: v => Types.ObjectId.isValid(v) ? new Types.ObjectId(v) : v,
    },
    // Products in the order (can contain multiple items)
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    orderItems: [
        {
            productId: {
                type: Schema.Types.Mixed,
                required: true,
                set: v => Types.ObjectId.isValid(v) ? new Types.ObjectId(v) : v,
            },
            productName: {
                type: String,
                required: true,
            },
            productPhoto: {
                type: String,
                required: true,
            },
            regularPrice: {
                type: Number,
                required: true,
            },
            salePrice: {
                type: Number,
            },
            quantity: {
                type: Number,
                required: true,
            },
            total: {
                type: Number,
                required: true,
            }
        }
    ],

    // Payment method
    paymentMethod: {
        type: String,
        default: "Cash on Delivery",
        immutable: true
    },
    isPaid: {
        type: Boolean,
        default: false,
    },

    // Total amount for the order
    totalAmount: {
        type: Number,
        required: true,
    },

    // Shipping address
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        phone: { type: String, required: true },
    },

    // Order status
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
},
    { timestamps: true },
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;