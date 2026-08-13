const Joi = require("joi");
const mongoose = require("mongoose");

// MongoDB ObjectId Validation
const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }

    return value;
};

// Order Item Validation
const orderItemSchema = Joi.object({
    product: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .required()
        .messages({
            "string.empty": "Product ID is required",
            "any.required": "Product ID is required",
            "any.invalid": "Invalid product ID",
        }),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": "Quantity must be a number",
            "number.integer": "Quantity must be a whole number",
            "number.min": "Quantity must be at least 1",
            "any.required": "Quantity is required",
        }),
});

// Create Order Validation
const createOrderSchema = Joi.object({
    items: Joi.array()
        .items(orderItemSchema)
        .min(1)
        .required()
        .messages({
            "array.base": "Items must be an array",
            "array.min": "Order must contain at least one item",
            "any.required": "Order items are required",
        }),

    paymentMethod: Joi.string()
        .valid(
            "Cash On Delivery",
            "UPI",
            "Card"
        )
        .default("Cash On Delivery")
        .messages({
            "any.only": "Invalid payment method",
            "string.empty": "Payment method cannot be empty",
        }),
});

// Update Order Status Validation
const updateOrderStatusSchema = Joi.object({
    orderStatus: Joi.string()
        .valid(
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        )
        .required()
        .messages({
            "string.empty": "Order status is required",
            "any.required": "Order status is required",
            "any.only": "Invalid order status",
        }),
});

// Export
module.exports = {
    createOrderSchema,
    orderItemSchema,
    updateOrderStatusSchema,
};