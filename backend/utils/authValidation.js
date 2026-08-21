const Joi = require("joi");
const { MESSAGES } = require("./setConstants");

const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .trim()
            .min(3)
            .max(30)
            .required()
            .messages({
                "string.empty": MESSAGES.USERNAME_IS_REQUIRED,
                "string.min": MESSAGES.USERNAME_MUST_BE_AT_LEAST_3_CHAR,
                "string.max": MESSAGES.USERNAME_CANNOT_EXCEED_30_CHAR,
            }),

        phone: Joi.string()
            .pattern(/^[6-9]\d{9}$/)
            .required()
            .messages({
                "string.pattern.base": MESSAGES.PHONE_NUMBER_MUST_BE_VALID_10_DIGIT,
                "string.empty": MESSAGES.PHONE_NUMBER_REQUIRED,
            }),

        password: Joi.string()
            .min(6)
            .max(20)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/
            )
            .required()
            .messages({
                "string.min":MESSAGES.PASSWORD_MUST_BE_6_CHAR,
                "string.max": MESSAGES.PASSWORD_CANNOT_EXCEED_20_CHAR,
                "string.pattern.base":MESSAGES.PASSWORD_VALIDATION,
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