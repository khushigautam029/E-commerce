const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const {
    STATUS_CODES,
    MESSAGES,
} = require("../utils/setConflicts");

// ======================================
// Add Product To Cart
// ======================================

const addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const userId = req.user.userId;
        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_FOUND,
            });
        }
        const cartItem = await Cart.findOne({
            user: userId,
            product,
        });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(STATUS_CODES.OK).json({
                success: true,
                message: MESSAGES.CART_ITEM_UPDATED,
                cartItem,
            });
        }

        const newCartItem = await Cart.create({
            user: userId,
            product,
            quantity,
        });

        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.CART_ITEM_ADDED,
            cartItem: newCartItem,
        });

    } catch (error) {
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// ======================================
// Get Logged In User Cart
// ======================================

const getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find({
            user: req.user.userId,
        }).populate("product");
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice +=
                item.product.price * item.quantity;
        });
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.CART_FETCHED,
            totalItems: cartItems.length,
            totalPrice,
            cartItems,
        });
    } catch (error) {
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// ======================================
// Update Cart Quantity
// ======================================

const updateCart = async (req, res) => {
    try {
        const { quantity } = req.body;
        const cartItem = await Cart.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });
        if (!cartItem) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: MESSAGES.CART_ITEM_NOT_FOUND,
            });
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.CART_ITEM_UPDATED,
            cartItem,
        });

    } catch (error) {
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// ======================================
// Remove Single Cart Item
// ======================================

const removeCartItem = async (req, res) => {
    try {
        const cartItem = await Cart.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });
        if (!cartItem) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: MESSAGES.CART_ITEM_NOT_FOUND,
            });
        }
        await Cart.findByIdAndDelete(req.params.id);
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.CART_ITEM_REMOVED,
        });
    } catch (error) {
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });

    }
};

// ======================================
// Clear Entire Cart
// ======================================

const clearCart = async (req, res) => {
    try {
        await Cart.deleteMany({
            user: req.user.userId,
        });
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.CART_CLEARED,
        });
    } catch (error) {
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
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
};