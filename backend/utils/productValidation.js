const Joi = require("joi");
const { MESSAGES } = require("./setConstants");

const addProductValidation = (data) => {

    const schema = Joi.object({

        name: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.empty": MESSAGES.PRODUCT_NAME_REQUIRED,
                "string.min": MESSAGES.PRODUCT_NAME_ATLEAST_3_CHAR,
            }),

        description: Joi.string()
            .trim()
            .min(10)
            .required()
            .messages({
                "string.empty": MESSAGES.DESCRIPTION_REQUIRED,
            }),

        category: Joi.string()
            .required()
            .messages({
                "string.empty": MESSAGES.CATEGORY_REQUIRED,
            }),

        subCategory: Joi.string().allow(""),
        brand: Joi.string().allow(""),
        price: Joi.number()
            .positive()
            .required()
            .messages({
                "number.base": MESSAGES.PRICE_MUST_BE_NUMBER,
                "number.positive": MESSAGES.PRICE_MUST_BE_GREATER_THAN_0,
            }),

        stock: Joi.number()
            .integer()
            .min(0)
            .required(),

        image: Joi.string()
            .required(),

        rating: Joi.number()
            .min(0)
            .max(5),

        reviews: Joi.number()
            .min(0),

        isFeatured: Joi.boolean(),

        isActive: Joi.boolean(),

    });

    return schema.validate(data);
};

const updateProductValidation = (data) => {

    const schema = Joi.object({

        name: Joi.string().trim().min(3).max(100),

        description: Joi.string().trim().min(10),

        category: Joi.string(),

        subCategory: Joi.string().allow(""),

        brand: Joi.string().allow(""),

        price: Joi.number().positive(),

        stock: Joi.number().integer().min(0),

        image: Joi.string(),

        rating: Joi.number().min(0).max(5),

        reviews: Joi.number().min(0),

        isFeatured: Joi.boolean(),

        isActive: Joi.boolean(),

    });

    return schema.validate(data);
};

module.exports = {
    addProductValidation,
    updateProductValidation,
};