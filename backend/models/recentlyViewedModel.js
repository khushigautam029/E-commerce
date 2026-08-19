const mongoose = require("mongoose");

const recentlyViewedSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


// One user cannot have the same product
// multiple times in Recently Viewed
recentlyViewedSchema.index(
    {
        user: 1,
        product: 1,
    },
    {
        unique: true,
    }
);


module.exports = mongoose.model(
    "RecentlyViewed",
    recentlyViewedSchema
);