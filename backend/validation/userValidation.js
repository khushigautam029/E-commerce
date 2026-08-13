const Joi = require("joi");

const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const signupSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "Username is required",
            "string.min": "Username must be at least 3 characters",
            "string.max": "Username cannot exceed 30 characters",
            "any.required": "Username is required",
        }),

    phone: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base":
                "Please enter a valid 10-digit Indian phone number",
            "any.required": "Phone number is required",
        }),

    email: Joi.string()
        .trim()
        .email()
        .optional()
        .allow("")
        .messages({
            "string.email": "Please enter a valid email address",
        }),

    password: Joi.string()
        .pattern(passwordPattern)
        .required()
        .messages({
            "string.empty": "Password is required",
            "string.pattern.base":
                "Password must be at least 6 characters and contain at least one letter, one number, and one special character",
            "any.required": "Password is required",
        }),
});


// Login Validation
const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please enter a valid email address",
            "any.required": "Email is required",
        }),

    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
});


module.exports = {
    signupSchema,
    loginSchema,
};