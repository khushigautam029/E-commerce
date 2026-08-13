const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");

const {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
} = require("../controllers/cartController");

const {
    addToCartValidation,
    updateCartValidation,
} = require("../utils/cartValidation");

// Add product to cart
router.post(
    "/",
    verifyToken,
    validate(addToCartValidation),
    addToCart
);

// Get logged-in user's cart
router.get(
    "/",
    verifyToken,
    getCart
);

// Update quantity
router.put(
    "/:id",
    verifyToken,
    validate(updateCartValidation),
    updateCart
);

// Remove single item
router.delete(
    "/:id",
    verifyToken,
    removeCartItem
);

// Clear entire cart
router.delete(
    "/",
    verifyToken,
    clearCart
);

module.exports = router;