const asyncHandler = require('express-async-handler');
const Order = require('../models/order');
const Product = require('../models/product');

/**
 * @desc Create a new order (Cash on Delivery)
 * @route POST /api/orders/create
 * @access Public or Authenticated (depends on your setup)
 */

const createOrder = asyncHandler(async (req, res) => {
    const { user, orderItems, totalAmount, shippingAddress } = req.body;

    console.log(req.body, "req.body in createOrder");

    if (!orderItems || orderItems.length === 0) {
        return res.status(400).json({
            message: "No order items provided"
        });
    }

    const order = new Order({
        user,
        orderItems: orderItems.map(item => ({
            productId: item.productId,
            productName: item.productName,
            productPhoto: item.productPhoto,
            productPrice: item.productPrice,
            quantity: item.quantity,
            total: item.total,
        })),
        shippingAddress,
        paymentMethod: "Cash on Delivery",
        totalAmount,
    });

    const saverOrder = await order.save();
    res.status(201).json({
        message: "Order created successfully",
        order: saverOrder,
    });
});

/**
 * @desc Get all orders (Admin)
 * @route GET /api/orders/all
 * @access Admin
 */

const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        orders,
    });
});

/**
 * @desc Get orders for a specific user
 * @route GET /api/orders/user/:userId
 * @access Private (User)
 */

const getUserOrders = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    console.log(userId, "userId in getUserOrders");
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    console.log(orders, "orders in getUserOrders");
    res.status(200).json({
        orders,
    });
})

/**
 * @desc Update order status (Admin)
 * @route PUT /api/orders/status/:orderId
 * @access Admin
 */

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            message: "Invalid order status"
        });
    }

    const updateOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );

    if (!updateOrder) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    res.status(200).json({
        message: "Order status updated successfully",
        order: updateOrder,
    });

})

/**
 * @desc Delete an order (Admin)
 * @route DELETE /api/orders/delete/:orderId
 * @access Admin
 */

const deleteOrder = asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const deleted = await Order.findByIdAndDelete(orderId);

    if (!deleted) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    res.status(200).json({
        message: "Order deleted successfully"
    });
})

module.exports = {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    deleteOrder,
}