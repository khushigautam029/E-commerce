const Joi = require("joi");

const createOrderValidation = (data) => {

    const schema = Joi.object({

        items: Joi.array()
            .items(
                Joi.object({
                    product: Joi.string().required(),
                    quantity: Joi.number().integer().min(1).required(),
                })
            )
            .min(1)
            .required(),

        paymentMethod: Joi.string()
            .valid("Cash On Delivery", "UPI", "Card")
            .required(),

        totalPrice: Joi.number()
            .positive()
            .required(),

    });

    return schema.validate(data);
};

const updateOrderValidation = (data) => {

    const schema = Joi.object({

        orderStatus: Joi.string().valid(
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled"
        ),

    });

    return schema.validate(data);
};

module.exports = {
    createOrderValidation,
    updateOrderValidation,
};