const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }

    return value;
};

const cartSchema = Joi.object({
    user: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .required()
        .messages({
            "string.empty": "User ID is required",
            "any.invalid": "Invalid user ID",
            "any.required": "User ID is required",
        }),

    product: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .required()
        .messages({
            "string.empty": "Product ID is required",
            "any.invalid": "Invalid product ID",
            "any.required": "Product ID is required",
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

module.exports = {
    cartSchema,
};