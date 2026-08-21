const Joi = require("joi");
const mongoose = require("mongoose");
const { MESSAGES } = require("./setConstants");

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }

    return value;
};

const notificationSchema = Joi.object({
    user: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .required()
        .messages({
            "any.invalid": MESSAGES.INVALID_USERID,
            "any.required": MESSAGES.USERID_REQUIRED,
        }),

    order: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .optional()
        .messages({
            "any.invalid": MESSAGES.INVALID_ORDERID,
        }),

    type: Joi.string()
        .valid(
            "ORDER_PLACED",
            "ORDER_CONFIRMED",
            "ORDER_SHIPPED",
            "ORDER_DELIVERED",
            "ORDER_CANCELLED"
        )
        .required()
        .messages({
            "any.only": MESSAGES.INVALID_NOTIFICATION_TYPE,
            "any.required": MESSAGES.NOTIFICATION_TYPE_IS_REQUIRED,
        }),

    title: Joi.string()
        .trim()
        .required(),

    message: Joi.string()
        .trim()
        .required(),

    isRead: Joi.boolean()
        .optional()
        .default(false),
});

module.exports = {
    notificationSchema,
};