const Joi = require("joi");

const wishlistSchema = Joi.object({
    productId: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Product ID is required",
            "any.required": "Product ID is required",
        }),
});

module.exports = {
    wishlistSchema,
};