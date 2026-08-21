const mongoose = require("mongoose");
const Wishlist = require("../models/wishlistModel.js");
const Product = require("../models/productModel.js");
const { wishlistSchema } = require("../validation/wishlistValidation.js");
const { MESSAGES, STATUS_CODES } = require("../utils/setConstants.js");

// Add Product to Wishlist
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;

        // Validate Product ID
        const { error } = wishlistSchema.validate(
            { productId },
            { abortEarly: false }
        );

        if (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.VALIDATION_FAILED,
                errors: error.details.map((detail) => detail.message),
            });
        }

        // Check valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.INVALID_PRODUCT_ID,
            });
        }

        // Check Product Exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_FOUND,
            });
        }

        // Find User Wishlist
        let wishlist = await Wishlist.findOne({ user: userId });
        // Create Wishlist if it doesn't exist
        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                products: [productId],
            });

            return res.status(STATUS_CODES.CREATED).json({
                success: true,
                message: MESSAGES.PRODUCT_ADDED_TO_WISHLIST,
                wishlist,
            });
        }

        // Check Product Already Exists
        if (wishlist.products.some(
            (id) => id.toString() === productId
        )) {
            return res.status(STATUS_CODES.CONFLICT).json({
                success: false,
                message: MESSAGES.PRODUCT_ALREADY_IN_WISHLIST
            });
        }

        // Add Product
        wishlist.products.push(productId);

        await wishlist.save();

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.PRODUCT_ADDED_TO_WISHLIST,
            wishlist,
        });

    } catch (error) {

        console.error("Add Wishlist Error:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.FAILED_TO_ADD_PRODUCT_TO_WISHLIST,
        });
    }
};

// Get Wishlist
const getWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;

        const wishlist = await Wishlist.findOne({
            user: userId,
        }).populate("products");

        if (!wishlist) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.WISHLIST_IS_EMPTY
            });
        }

        return res.status(STATUS_CODES.OK).json({
            success: true,
            wishlist,
        });

    } catch (error) {

        console.error("Get Wishlist Error:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.FAILED_TO_FETCH_WISHLIST,
        });
    }
};

// ======================================================
// Remove Product from Wishlist
// ======================================================

const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;

        // --------------------------------------------------
        // Validate Product ID
        // --------------------------------------------------

        const { error } = wishlistSchema.validate(
            { productId },
            { abortEarly: false }
        );

        if (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.VALIDATION_ERROR,
                errors: error.details.map((detail) => detail.message),
            });
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.INVALID_PRODUCT_ID,
            });
        }

        const wishlist = await Wishlist.findOne({
            user: userId,
        });

        if (!wishlist) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.WISHLIST_NOT_FOUND,
            });
        }

        const productExists = wishlist.products.some(
            (id) => id.toString() === productId
        );

        if (!productExists) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_IN_WISHLIST,
            });
        }

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.PRODUCT_REMOVED_FROM_WISHLIST,
            wishlist,
        });

    } catch (error) {

        console.error("Remove Wishlist Error:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.FAILED_TO_REMOVE_PRODUCT_FROM_WISHLIST
        });
    }
};

const clearWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;
        const wishlist = await Wishlist.findOne({
            user: userId,
        });

        if (!wishlist) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.WISHLIST_NOT_FOUND
            });
        }

        if (wishlist.products.length === 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.WISHLIST_IS_EMPTY
            });
        }
        wishlist.products = [];
        await wishlist.save();
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.WISHLIST_CLEARED_SUCCESSFULLY
        });

    } catch (error) {

        console.error("Clear Wishlist Error:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.FAILED_TO_CLEAR_WISHLIST,
        });
    }
};


module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist,
};
