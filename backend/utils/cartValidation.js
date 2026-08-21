const Joi = require("joi");
const { MESSAGES } = require("./setConstants");

const addToCartValidation = (data) => {

    const schema = Joi.object({

        product: Joi.string()
            .required()
            .messages({
                "string.empty": MESSAGES.PRODUCT_REQUIRED,
            }),

        quantity: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                "number.min": MESSAGES.QUANTITY_MUST_BE_ATLEAST_1,
            }),

    });

    return schema.validate(data);
};

const updateCartValidation = (data) => {

    const schema = Joi.object({

        quantity: Joi.number()
            .integer()
            .min(1)
            .required(),

    });

    return schema.validate(data);
};

module.exports = {
    addToCartValidation,
    updateCartValidation,
};