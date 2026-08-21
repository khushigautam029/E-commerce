const Joi = require("joi");
const { MESSAGES } = require("../utils/setConstants");

const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const signupSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": MESSAGES.USERNAME_IS_REQUIRED,
            "string.min":
                MESSAGES.USERNAME_MUST_BE_AT_LEAST_3_CHAR,
            "string.max":
                MESSAGES.USERNAME_CANNOT_EXCEED_30_CHAR,
            "any.required":
                MESSAGES.USERNAME_IS_REQUIRED,
        }),

    phone: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.empty":
               MESSAGES.PHONE_NUMBER_REQUIRED,
            "string.pattern.base":
                MESSAGES.PHONE_NUMBER_MUST_BE_VALID_10_DIGIT,
            "any.required":
                MESSAGES.PHONE_NUMBER_REQUIRED,
        }),

    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty":
                MESSAGES.EMAIL_REQUIRED,
            "string.email":
                "Please enter a valid email address",
            "any.required":
                MESSAGES.EMAIL_REQUIRED,
        }),

    password: Joi.string()
        .pattern(passwordPattern)
        .required()
        .messages({
            "string.empty":
                MESSAGES.PASSWORD_REQUIRED,
            "string.pattern.base":
                MESSAGES.PASSWORD_VALIDATION,
            "any.required":
                MESSAGES.PASSWORD_REQUIRED,
        }),
});

const loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required()
        .messages({
            "string.empty":
                MESSAGES.EMAIL_REQUIRED,
            "string.email":
                "Please enter a valid email address",
            "any.required":
                MESSAGES.EMAIL_REQUIRED,
        }),

    password: Joi.string()
        .required()
        .messages({
            "string.empty":
                MESSAGES.PASSWORD_REQUIRED,
            "any.required":
                MESSAGES.PASSWORD_REQUIRED,
        }),
});

const updateProfileSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(3)
        .max(30)
        .messages({
            "string.empty":
                "Username cannot be empty",
            "string.min":
                MESSAGES.USERNAME_MUST_BE_AT_LEAST_3_CHAR,
            "string.max":
                MESSAGES.USERNAME_CANNOT_EXCEED_30_CHAR,
        }),

    phone: Joi.string()
        .trim()
        .pattern(/^[6-9]\d{9}$/)
        .messages({
            "string.empty":
                "Phone number cannot be empty",
            "string.pattern.base":
                MESSAGES.PHONE_NUMBER_MUST_BE_VALID_10_DIGIT,
        }),

    email: Joi.string()
        .trim()
        .email()
        .messages({
            "string.empty":
                "Email cannot be empty",
            "string.email":
                "Please enter a valid email address",
        }),
})
    .min(1)
    .messages({
        "object.min":
            "At least one profile field is required",
    });

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string()
        .required()
        .messages({
            "string.empty":
                "Current password is required",
            "any.required":
                "Current password is required",
        }),

    newPassword: Joi.string()
        .pattern(passwordPattern)
        .required()
        .messages({
            "string.empty":
                "New password is required",
            "string.pattern.base":
                "New password must be at least 6 characters and contain at least one letter, one number, and one special character",
            "any.required":
                "New password is required",
        }),

    confirmPassword: Joi.any()
        .valid(Joi.ref("newPassword"))
        .required()
        .messages({
            "any.only":
                "Passwords do not match",
            "any.required":
                "Confirm password is required",
        }),
});

const deleteAccountSchema = Joi.object({

    password: Joi.string()
        .required()
        .messages({
            "string.empty":
                MESSAGES.PASSWORD_REQUIRED,
            "any.required":
                MESSAGES.PASSWORD_REQUIRED,
        }),

});


module.exports = {
    signupSchema,
    loginSchema,
    updateProfileSchema,
    changePasswordSchema,
    deleteAccountSchema
};