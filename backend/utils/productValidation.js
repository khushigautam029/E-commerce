const Joi = require("joi");

const addProductValidation = (data) => {

    const schema = Joi.object({

        name: Joi.string()
            .trim()
            .min(3)
            .max(100)
            .required()
            .messages({
                "string.empty": "Product name is required",
                "string.min": "Product name should be at least 3 characters",
            }),

        description: Joi.string()
            .trim()
            .min(10)
            .required()
            .messages({
                "string.empty": "Description is required",
            }),

        category: Joi.string()
            .required()
            .messages({
                "string.empty": "Category is required",
            }),

        subCategory: Joi.string().allow(""),

        brand: Joi.string().allow(""),

        price: Joi.number()
            .positive()
            .required()
            .messages({
                "number.base": "Price must be a number",
                "number.positive": "Price must be greater than zero",
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