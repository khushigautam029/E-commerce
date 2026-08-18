const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware.js");

const {
    addToWishlist,
    getWishlist,
} = require("../controllers/wishlistController.js");

// Add product to wishlist
router.post("/:productId", verifyToken, addToWishlist);

// Get logged-in user's wishlist
router.get("/", verifyToken, getWishlist);

module.exports = router;