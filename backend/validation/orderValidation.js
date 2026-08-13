const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }

    return value;
};

const orderItemSchema = Joi.object({
    product: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .required()
        .messages({
            "any.invalid": "Invalid product ID",
            "any.required": "Product ID is required",
        }),

    name: Joi.string()
        .trim()
        .min(1)
        .required()
        .messages({
            "string.empty": "Product name is required",
            "any.required": "Product name is required",
        }),

    image: Joi.string()
        .trim()
        .allow("")
        .optional(),

    price: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Product price must be a number",
            "number.min": "Product price cannot be negative",
            "any.required": "Product price is required",
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

const orderSchema = Joi.object({
    user: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .required()
        .messages({
            "any.invalid": "Invalid user ID",
            "any.required": "User ID is required",
        }),

    items: Joi.array()
        .items(orderItemSchema)
        .min(1)
        .required()
        .messages({
            "array.min": "Order must contain at least one item",
            "any.required": "Order items are required",
        }),

    totalPrice: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Total price must be a number",
            "number.min": "Total price cannot be negative",
            "any.required": "Total price is required",
        }),

    paymentMethod: Joi.string()
        .valid(
            "Cash On Delivery",
            "UPI",
            "Card"
        )
        .optional()
        .default("Cash On Delivery")
        .messages({
            "any.only": "Invalid payment method",
        }),

    orderStatus: Joi.string()
        .valid(
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        )
        .optional()
        .default("Pending")
        .messages({
            "any.only": "Invalid order status",
        }),
});

module.exports = {
    orderSchema,
    orderItemSchema,
};