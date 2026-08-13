const Joi = require("joi");
const mongoose = require("mongoose");

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
            "any.invalid": "Invalid user ID",
            "any.required": "User ID is required",
        }),

    order: Joi.string()
        .custom(objectId, "MongoDB ObjectId validation")
        .optional()
        .messages({
            "any.invalid": "Invalid order ID",
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
            "any.only": "Invalid notification type",
            "any.required": "Notification type is required",
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