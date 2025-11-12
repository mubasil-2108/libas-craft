const express = require('express');
const { createOrder, deleteOrder, getAllOrders, getUserOrders, updateOrderStatus } = require('../controllers/order');

const router = express.Router();

router.post('/create-order', createOrder);
router.get('/all-orders', getAllOrders);
router.get('/user/:userId', getUserOrders);
router.put('/update-status/:orderId', updateOrderStatus);
router.delete('/delete/:orderId', deleteOrder);

module.exports = router;