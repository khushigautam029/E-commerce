const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware.js");

const {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist
} = require("../controllers/wishlistController.js");

// Add product to wishlist
router.post("/:productId", verifyToken, addToWishlist);

// Get logged-in user's wishlist
router.get("/", verifyToken, getWishlist);

// Remove one product
router.delete("/:productId", verifyToken, removeFromWishlist);

// Clear entire wishlist
router.delete("/", verifyToken, clearWishlist);

module.exports = router;