const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }

    return value;
};

const addToCartSchema = Joi.object({
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

const updateCartSchema = Joi.object({
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

module.exports = {
    addToCartSchema,
    updateCartSchema,
};