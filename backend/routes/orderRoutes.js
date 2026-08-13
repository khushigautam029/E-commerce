const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");

const {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} = require("../controllers/orderController");

const {
    createOrderValidation,
    updateOrderValidation,
} = require("../utils/orderValidation");

// Create Order
router.post(
    "/",
    verifyToken,
    validate(createOrderValidation),
    createOrder
);

// Get Logged-in User Orders
router.get(
    "/my-orders",
    verifyToken,
    getMyOrders
);

// Get Single Order
router.get(
    "/:id",
    verifyToken,
    getOrderById
);

// Update Order Status
router.put(
    "/:id",
    verifyToken,
    validate(updateOrderValidation),
    updateOrderStatus
);

// Delete Order
router.delete(
    "/:id",
    verifyToken,
    deleteOrder
);

module.exports = router;