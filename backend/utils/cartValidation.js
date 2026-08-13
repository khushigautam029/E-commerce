const Joi = require("joi");

const addToCartValidation = (data) => {

    const schema = Joi.object({

        product: Joi.string()
            .required()
            .messages({
                "string.empty": "Product is required",
            }),

        quantity: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                "number.min": "Quantity must be at least 1",
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