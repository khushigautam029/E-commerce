const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
    addRecentlyViewed,
    getRecentlyViewed,
    removeRecentlyViewed,
    clearRecentlyViewed,
} = require("../controllers/recentlyViewedController");

// Add product to recently viewed
router.post("/:productId", verifyToken, addRecentlyViewed );
// Get recently viewed products
router.get("/", verifyToken, getRecentlyViewed );
// Remove one product
router.delete("/:productId", verifyToken, removeRecentlyViewed );
// Clear all recently viewed products
router.delete("/", verifyToken, clearRecentlyViewed );

module.exports = router;