const Joi = require("joi");
const { MESSAGES } = require("./setConstants");

const updateProfileValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .trim()
            .min(3)
            .max(30),
        phone: Joi.string()
            .pattern(/^[0-9]{10}$/)
            .messages({
                "string.pattern.base": MESSAGES.PHONE_NUMBER_MUST_BE_VALID_10_DIGIT,
            }),
        email: Joi.string()
            .email()
            .allow(""),
        address: Joi.string()
            .allow(""),
        profileImage: Joi.string()
            .allow(""),
    });
    return schema.validate(data);
};

const changePasswordValidation = (data) => {
    const schema = Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string()
            .min(6)
            .required(),
    });
    return schema.validate(data);
};

module.exports = {
    updateProfileValidation,
    changePasswordValidation,
};