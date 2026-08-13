const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const {
    STATUS_CODES,
    MESSAGES,
} = require("../utils/setConflicts");
const {
    reviewSchema,
    updateReviewSchema,
} = require("../validation/reviewValidation");

// Add Product Review
const addReview = async (req, res) => {
    try {

        const { error, value } = reviewSchema.validate(
            req.body,
            {
                abortEarly: false,
            }
        );

        if (error) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(
                    (detail) => detail.message
                ),
            });
        }

        const {
            product,
            rating,
            comment,
        } = value;

        const userId = req.user.userId;

        // Check product
        const existingProduct = await Product.findById(
            product
        );

        if (!existingProduct) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_FOUND,
            });
        }

        // Check if user already reviewed this product
        const existingReview = await Review.findOne({
            user: userId,
            product,
        });

        if (existingReview) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message: "You have already reviewed this product",
            });
        }

        const review = await Review.create({
            user: userId,
            product,
            rating,
            comment,
        });

        return res.status(
            STATUS_CODES.CREATED
        ).json({
            success: true,
            message: "Review added successfully",
            review,
        });

    } catch (error) {

        console.error("Add Review Error:", error);

        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};


// Get Reviews For Product
const getProductReviews = async (req, res) => {
    try {

        const { productId } = req.params;

        const existingProduct = await Product.findById(
            productId
        );

        if (!existingProduct) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_FOUND,
            });
        }

        const reviews = await Review.find({
            product: productId,
        })
            .populate(
                "user",
                "username"
            )
            .sort({
                createdAt: -1,
            });

        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: "Reviews fetched successfully",
            totalReviews: reviews.length,
            reviews,
        });

    } catch (error) {
        console.error(
            "Get Product Reviews Error:",
            error
        );
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// Get Review By ID
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(
            req.params.id
        )
            .populate(
                "user",
                "username"
            )
            .populate(
                "product",
                "name image price"
            );
        if (!review) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "Review not found",
            });
        }
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: "Review fetched successfully",
            review,
        });
    } catch (error) {
        console.error(
            "Get Review By ID Error:",
            error
        );
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// Update Review
const updateReview = async (req, res) => {
    try {

        const { error } = updateReviewSchema.validate(
            req.body,
            {
                abortEarly: false,
            }
        );

        if (error) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(
                    (detail) => detail.message
                ),
            });
        }

        const review = await Review.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!review) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "Review not found",
            });
        }

        // Update rating only if provided
        if (req.body.rating !== undefined) {
            review.rating = req.body.rating;
        }

        // Update comment only if provided
        if (req.body.comment !== undefined) {
            review.comment = req.body.comment;
        }

        await review.save();

        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: "Review updated successfully",
            review,
        });

    } catch (error) {

        console.error(
            "Update Review Error:",
            error
        );

        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};


// Delete Review
const deleteReview = async (req, res) => {
    try {

        const review = await Review.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!review) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "Review not found",
            });
        }

        await Review.findByIdAndDelete(
            req.params.id
        );

        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: "Review deleted successfully",
        });

    } catch (error) {

        console.error(
            "Delete Review Error:",
            error
        );

        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};


module.exports = {
    addReview,
    getProductReviews,
    getReviewById,
    updateReview,
    deleteReview,
};