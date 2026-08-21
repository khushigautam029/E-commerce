const Joi = require("joi");
const { MESSAGES } = require("../utils/setConstants");

const wishlistSchema = Joi.object({
    productId: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": MESSAGES.PRODUCT_ID_REQUIRED,
            "any.required": MESSAGES.PRODUCT_ID_REQUIRED,
        }),
});

module.exports = {
    wishlistSchema,
};