const Order = require("../models/Order");
const Product = require("../models/productModel");

const {
    STATUS_CODES,
    MESSAGES,
} = require("../utils/setConflicts");

// Create Order
const createOrder = async (req, res) => {
    try {
        const { items, paymentMethod } = req.body;
        const userId = req.user.userId;
        let orderItems = [];
        let totalPrice = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(STATUS_CODES.NOT_FOUND).json({
                    success: false,
                    message: MESSAGES.PRODUCT_NOT_FOUND,
                });
            }
            if (product.stock < item.quantity) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    success: false,
                    message: `${product.name} is out of stock`,
                });
            }
            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.quantity,
            });
            totalPrice += product.price * item.quantity;
            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalPrice,
            paymentMethod,
        });

        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.ORDER_CREATED,
            order,
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

// Get My Orders
const getMyOrders = async (req, res) => {
    try {mono
        const orders = await Order.find({

            user: req.user.userId,

        }).sort({

            createdAt: -1,

        });

        return res.status(STATUS_CODES.OK).json({

            success: true,

            message: MESSAGES.ORDER_FETCHED,

            totalOrders: orders.length,

            orders,

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

// ====================================
// Get Order By Id
// ====================================

const getOrderById = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({

                success: false,

                message: MESSAGES.ORDER_NOT_FOUND,

            });

        }

        return res.status(STATUS_CODES.OK).json({

            success: true,

            order,

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

// ====================================
// Update Order Status
// ====================================

const updateOrderStatus = async (req, res) => {

    try {

        const { orderStatus } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({

                success: false,

                message: MESSAGES.ORDER_NOT_FOUND,

            });

        }

        order.orderStatus = orderStatus;

        await order.save();

        return res.status(STATUS_CODES.OK).json({

            success: true,

            message: MESSAGES.ORDER_UPDATED,

            order,

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

// ====================================
// Delete Order
// ====================================

const deleteOrder = async (req, res) => {

    try {

        const order = await Order.findById(req.params.id);

        if (!order) {

            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({

                success: false,

                message: MESSAGES.ORDER_NOT_FOUND,

            });

        }

        await Order.findByIdAndDelete(req.params.id);

        return res.status(STATUS_CODES.OK).json({

            success: true,

            message: MESSAGES.ORDER_DELETED,

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

    createOrder,

    getMyOrders,

    getOrderById,

    updateOrderStatus,

    deleteOrder,

};