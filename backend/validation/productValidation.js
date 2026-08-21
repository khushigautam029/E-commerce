const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required()
        .messages({
            "string.empty": "Product name is required",
            "string.min": "Product name must be at least 2 characters",
            "string.max": "Product name cannot exceed 100 characters",
            "any.required": "Product name is required",
        }),

    description: Joi.string()
        .trim()
        .min(10)
        .max(1000)
        .required()
        .messages({
            "string.empty": "Product description is required",
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description cannot exceed 1000 characters",
            "any.required": "Product description is required",
        }),

    category: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required()
        .messages({
            "string.empty": "Category is required",
            "string.min": "Category must be at least 2 characters",
            "string.max": "Category cannot exceed 50 characters",
            "any.required": "Category is required",
        }),

    subCategory: Joi.string()
        .trim()
        .max(50)
        .allow("")
        .optional(),

    brand: Joi.string()
        .trim()
        .max(50)
        .allow("")
        .optional(),

    price: Joi.number()
        .min(0)
        .required()
        .messages({
            "number.base": "Price must be a number",
            "number.min": "Price cannot be negative",
            "any.required": "Price is required",
        }),

    stock: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Stock must be a number",
            "number.integer": "Stock must be a whole number",
            "number.min": "Stock cannot be negative",
            "any.required": "Stock is required",
        }),

    image: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Product image is required",
            "any.required": "Product image is required",
        }),

    isFeatured: Joi.boolean()
        .optional()
        .default(false),

    isActive: Joi.boolean()
        .optional()
        .default(true),
});


const productUpdateSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .optional()
        .messages({
            "string.min": "Product name must be at least 2 characters",
            "string.max": "Product name cannot exceed 100 characters",
        }),

    description: Joi.string()
        .trim()
        .min(10)
        .max(1000)
        .optional()
        .messages({
            "string.min": "Description must be at least 10 characters",
            "string.max": "Description cannot exceed 1000 characters",
        }),

    category: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .optional(),

    subCategory: Joi.string()
        .trim()
        .max(50)
        .allow("")
        .optional(),

    brand: Joi.string()
        .trim()
        .max(50)
        .allow("")
        .optional(),

    price: Joi.number()
        .min(0)
        .optional()
        .messages({
            "number.base": "Price must be a number",
            "number.min": "Price cannot be negative",
        }),

    stock: Joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({
            "number.base": "Stock must be a number",
            "number.integer": "Stock must be a whole number",
            "number.min": "Stock cannot be negative",
        }),

    image: Joi.string()
        .trim()
        .optional(),

    isFeatured: Joi.boolean()
        .optional(),

    isActive: Joi.boolean()
        .optional(),
})
.min(1)
.messages({
    "object.min": "At least one field is required to update the product",
});


module.exports = {
    productSchema,
    productUpdateSchema,
};