const mongoose = require("mongoose");
const Wishlist = require("../models/wishlistModel.js");
const Product = require("../models/productModel.js");
const { wishlistSchema } = require("../validation/wishlistValidation.js");
const { MESSAGES, STATUS_CODES } = require("../utils/setConflicts.js");

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
                message: "Invalid product ID",
            });
        }

        // Check Product Exists
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: "Product not found",
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
                message: "Product added to wishlist",
                wishlist,
            });
        }

        // Check Product Already Exists
        if (wishlist.products.some(
            (id) => id.toString() === productId
        )) {
            return res.status(STATUS_CODES.CONFLICT).json({
                success: false,
                message: "Product is already in wishlist",
            });
        }

        // Add Product
        wishlist.products.push(productId);

        await wishlist.save();

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Product added to wishlist",
            wishlist,
        });

    } catch (error) {

        console.error("Add Wishlist Error:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to add product to wishlist",
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
                message: "Wishlist is empty",
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
            message: "Failed to fetch wishlist",
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
                message: MESSAGES.VALIDATION_FAILED,
                errors: error.details.map((detail) => detail.message),
            });
        }

        // --------------------------------------------------
        // Check Valid MongoDB ObjectId
        // --------------------------------------------------

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        // --------------------------------------------------
        // Find User Wishlist
        // --------------------------------------------------

        const wishlist = await Wishlist.findOne({
            user: userId,
        });

        if (!wishlist) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: "Wishlist not found",
            });
        }

        // --------------------------------------------------
        // Check Product Exists in Wishlist
        // --------------------------------------------------

        const productExists = wishlist.products.some(
            (id) => id.toString() === productId
        );

        if (!productExists) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: "Product is not in wishlist",
            });
        }

        // --------------------------------------------------
        // Remove Product
        // --------------------------------------------------

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist,
        });

    } catch (error) {

        console.error("Remove Wishlist Error:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to remove product from wishlist",
        });
    }
};


// ======================================================
// Clear Wishlist
// ======================================================

const clearWishlist = async (req, res) => {
    try {
        const userId = req.user.userId;

        // --------------------------------------------------
        // Find User Wishlist
        // --------------------------------------------------

        const wishlist = await Wishlist.findOne({
            user: userId,
        });

        if (!wishlist) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: "Wishlist not found",
            });
        }

        // --------------------------------------------------
        // Check Wishlist Already Empty
        // --------------------------------------------------

        if (wishlist.products.length === 0) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: "Wishlist is already empty",
            });
        }

        // --------------------------------------------------
        // Clear Products
        // --------------------------------------------------

        wishlist.products = [];

        await wishlist.save();

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Wishlist cleared successfully",
            wishlist,
        });

    } catch (error) {

        console.error("Clear Wishlist Error:", error);

        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to clear wishlist",
        });
    }
};


module.exports = {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    clearWishlist,
};
