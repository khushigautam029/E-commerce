const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }

    return value;
};

const reviewSchema = Joi.object({
    product: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .required()
        .messages({
            "string.empty": "Product ID is required",
            "any.required": "Product ID is required",
            "any.invalid": "Invalid product ID",
        }),

    rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required()
        .messages({
            "number.base": "Rating must be a number",
            "number.integer": "Rating must be a whole number",
            "number.min": "Rating must be between 1 and 5",
            "number.max": "Rating must be between 1 and 5",
            "any.required": "Rating is required",
        }),

    comment: Joi.string()
        .trim()
        .min(2)
        .max(500)
        .required()
        .messages({
            "string.empty": "Comment is required",
            "string.min": "Comment must be at least 2 characters",
            "string.max": "Comment cannot exceed 500 characters",
            "any.required": "Comment is required",
        }),
});


// Update Review
const updateReviewSchema = Joi.object({
    rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .optional()
        .messages({
            "number.base": "Rating must be a number",
            "number.integer": "Rating must be a whole number",
            "number.min": "Rating must be between 1 and 5",
            "number.max": "Rating must be between 1 and 5",
        }),

    comment: Joi.string()
        .trim()
        .min(2)
        .max(500)
        .optional()
        .messages({
            "string.min": "Comment must be at least 2 characters",
            "string.max": "Comment cannot exceed 500 characters",
        }),
}).min(1);


module.exports = {
    reviewSchema,
    updateReviewSchema,
};