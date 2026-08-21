const Joi = require("joi");
const mongoose = require("mongoose");
const { MESSAGES } = require("../utils/setConstants.js");

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
            "string.empty": MESSAGES.PRODUCT_ID_REQUIRED,
            "any.required": MESSAGES.PRODUCT_ID_REQUIRED,
            "any.invalid": MESSAGES.INVALID_PRODUCT_ID,
        }),

    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": MESSAGES.QUANTITY_MUST_BE_NUMBER,
            "number.integer": MESSAGES.QUANTITY_MUST_BE_WHOLE_NUMBER,
            "number.min": MESSAGES.QUANTITY_MUST_BE_ATLEAST_1,
            "any.required": MESSAGES.QUANTITY_REQUIRED,
        }),
});

const updateCartSchema = Joi.object({
    quantity: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": MESSAGES.QUANTITY_MUST_BE_NUMBER,
            "number.integer":MESSAGES.QUANTITY_MUST_BE_WHOLE_NUMBER,
            "number.min": MESSAGES.QUANTITY_MUST_BE_ATLEAST_1,
            "any.required": MESSAGES.QUANTITY_REQUIRED,
        }),
});

module.exports = {
    addToCartSchema,
    updateCartSchema,
};