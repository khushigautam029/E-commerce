const Order = require("../models/Order");
const Product = require("../models/productModel");
const {
    createOrderSchema,
    updateOrderStatusSchema,
} = require("../validation/orderValidation");
const {
    STATUS_CODES,
    MESSAGES,
} = require("../utils/setConflicts");
const Notification = require("../models/notificationModel");

// Create Order
const createOrder = async (req, res) => {
    try {
        const { error, value } = createOrderSchema.validate(
            req.body,
            {
                abortEarly: false,
                stripUnknown: true,
            }
        );

        if (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(
                    (detail) => detail.message
                ),
            });
        }

        const { items, paymentMethod } = value;

        const userId = req.user.userId;

        let orderItems = [];
        let totalPrice = 0;
        for (const item of items) {

            const product = await Product.findById(
                item.product
            );

            if (!product) {
                return res.status(
                    STATUS_CODES.NOT_FOUND
                ).json({
                    success: false,
                    message: MESSAGES.PRODUCT_NOT_FOUND,
                });
            }

            if (product.stock < item.quantity) {
                return res.status(
                    STATUS_CODES.BAD_REQUEST
                ).json({
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

            totalPrice +=
                product.price * item.quantity;
            product.stock -= item.quantity;
            await product.save();
        }

        const order = await Order.create({
            user: userId,
            items: orderItems,
            totalPrice,
            paymentMethod,
        });

        await Notification.create({
            user: userId,
            order: order._id,
            type: "ORDER_PLACED",
            title: "Order Placed",
            message: `Your order #${order._id} has been placed successfully.`,
        });


        return res.status(
            STATUS_CODES.CREATED
        ).json({
            success: true,
            message: MESSAGES.ORDER_CREATED,
            order,
        });

    } catch (error) {

        console.error("Create Order Error:", error);

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
    try {
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

// Get Order By Id
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

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { error, value } =
            updateOrderStatusSchema.validate(
                req.body,
                {
                    abortEarly: false,
                    stripUnknown: true,
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

        const { orderStatus } = value;

        const order = await Order.findById(
            req.params.id
        );
        if (!order) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: MESSAGES.ORDER_NOT_FOUND,
            });
        }
        // Update Status
        order.orderStatus = orderStatus;

        await order.save();

        let notificationType;
        let notificationTitle;
        let notificationMessage;

        switch (orderStatus) {
            case "Processing":
                notificationType = "ORDER_CONFIRMED";
                notificationTitle = "Order Confirmed";
                notificationMessage =
                    `Your order #${order._id} has been confirmed and is being processed.`;
                break;

            case "Shipped":
                notificationType = "ORDER_SHIPPED";
                notificationTitle = "Order Shipped";
                notificationMessage =
                    `Your order #${order._id} has been shipped.`;
                break;

            case "Delivered":
                notificationType = "ORDER_DELIVERED";
                notificationTitle = "Order Delivered";
                notificationMessage =
                    `Your order #${order._id} has been delivered successfully.`;
                break;

            case "Cancelled":
                notificationType = "ORDER_CANCELLED";
                notificationTitle = "Order Cancelled";
                notificationMessage =
                    `Your order #${order._id} has been cancelled.`;
                break;
        }

        if (notificationType) {
            await Notification.create({
                user: order.user,
                order: order._id,
                type: notificationType,
                title: notificationTitle,
                message: notificationMessage,
            });
        }

        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: MESSAGES.ORDER_UPDATED,
            order,
        });
    } catch (error) {
        console.error(
            "Update Order Status Error:",
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

// Delete Order
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


// ====================================
// Cancel Order
// ====================================

const cancelOrder = async (req, res) => {
    try {

        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!order) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.ORDER_NOT_FOUND,
            });
        }

        // Only Pending orders can be cancelled
        if (order.orderStatus !== "Pending") {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: "Only pending orders can be cancelled",
            });
        }

        // Restore product stock
        for (const item of order.items) {

            const product = await Product.findById(
                item.product
            );

            if (product) {
                product.stock += item.quantity;

                await product.save();
            }
        }

        // Update order status
        order.orderStatus = "Cancelled";

        await order.save();

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.ORDER_CANCELLED,
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


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    cancelOrder
};