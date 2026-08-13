const express = require("express");
const {
    addReview,
    getProductReviews,
    getReviewById,
    updateReview,
    deleteReview,
} = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Add review
router.post(
    "/",
    authMiddleware,
    addReview
);

// Get reviews for a product
router.get(
    "/product/:productId",
    getProductReviews
);

// Get review by ID
router.get(
    "/:id",
    getReviewById
);

// Update own review
router.put(
    "/:id",
    authMiddleware,
    updateReview
);

// Delete own review
router.delete(
    "/:id",
    authMiddleware,
    deleteReview
);

module.exports = router;