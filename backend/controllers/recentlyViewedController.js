const mongoose = require("mongoose");
const RecentlyViewed = require("../models/recentlyViewedModel");
const Product = require("../models/productModel");
const {
    STATUS_CODES,
    MESSAGES,
} = require("../utils/setConstants");

const addRecentlyViewed = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;
        // Validate Product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message: MESSAGES.INVALID_PRODUCT_ID,
            });
        }
        // Check product exist
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_FOUND,
            });
        }

        // Find existing recently viewed record
        const existingRecentlyViewed =
            await RecentlyViewed.findOne({
                user: userId,
                product: productId,
            });
        if (existingRecentlyViewed) {
            // Update viewed time
            existingRecentlyViewed.updatedAt = new Date();
            await existingRecentlyViewed.save();
        } else {
            // Create new record
            await RecentlyViewed.create({
                user: userId,
                product: productId,
            });
        }

        // Keep only latest 20 products
        const recentlyViewed =
            await RecentlyViewed.find({
                user: userId,
            })
                .sort({ updatedAt: -1 })
                .select("_id");

        if (recentlyViewed.length > 20) {
            const recordsToDelete =
                recentlyViewed.slice(20);
            const idsToDelete =
                recordsToDelete.map(
                    (item) => item._id
                );
            await RecentlyViewed.deleteMany({
                _id: {
                    $in: idsToDelete,
                },
            });
        }
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: MESSAGES.PRODUCT_ADDED_TO_RECENTLY_VIEWED,
        });
    } catch (error) {
        console.error(
            "Add Recently Viewed Error:",
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

const getRecentlyViewed = async (req, res) => {
    try {
        const userId = req.user.userId;
        const recentlyViewed =
            await RecentlyViewed.find({
                user: userId,
            })
                .populate({
                    path: "product",
                })
                .sort({
                    updatedAt: -1,
                });

        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            count: recentlyViewed.length,
            recentlyViewed,
        });
    } catch (error) {
        console.error(
            "Get Recently Viewed Error:",
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

const removeRecentlyViewed = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.userId;
        // Validate Product ID
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message: MESSAGES.INVALID_PRODUCT_ID,
            });
        }
        const recentlyViewed =
            await RecentlyViewed.findOneAndDelete({
                user: userId,
                product: productId,
            });
        if (!recentlyViewed) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_IN_RECENTLY_VIEWED,
            });
        }
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:MESSAGES.PRODUCT_REMOVED_FROM_RECENTLY_VIEWED,
        });
    } catch (error) {
        console.error(
            "Remove Recently Viewed Error:",
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

const clearRecentlyViewed = async (req, res) => {
    try {
        const userId = req.user.userId;
        const result =
            await RecentlyViewed.deleteMany({
                user: userId,
            });

        if (result.deletedCount === 0) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: MESSAGES.RECENTLY_VIEWED_IS_ALREADY_EMPTY,
            });
        }
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:MESSAGES.RECENTLY_VIEWED_PRODUCTS_CLEARED_SUCCESSFULLY,
        });

    } catch (error) {
        console.error(
            "Clear Recently Viewed Error:",
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
    addRecentlyViewed,
    getRecentlyViewed,
    removeRecentlyViewed,
    clearRecentlyViewed,
};