const Joi = require("joi");

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .trim()
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.empty": "Username is required",
                "string.min": "Username must be at least 3 characters",
                "string.max": "Username cannot exceed 30 characters",
            }),

        phone: Joi.string()
            .pattern(/^[6-9]\d{9}$/)
            .required()
            .messages({
                "string.pattern.base": "Phone number must be a valid 10-digit Indian mobile number",
                "string.empty": "Phone number is required",
            }),

        password: Joi.string()
            .min(6)
            .max(20)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
            )
            .required()
            .messages({
                "string.min": "Password must be at least 6 characters",
                "string.max": "Password cannot exceed 20 characters",
                "string.pattern.base":
                    "Password must contain uppercase, lowercase, number and special character",
            }),
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),

        phone: Joi.string()
            .pattern(/^[6-9]\d{9}$/)
            .required(),

        password: Joi.string().required(),
    });

    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
};