const Product = require("../models/productModel");
const { STATUS_CODES, MESSAGES } = require("../utils/setConstants");
const mongoose = require("mongoose");
const {
    productSchema,
    productUpdateSchema,
} = require("../validation/productValidation");

// Add Product
const addProduct = async (req, res) => {
    try {
        // Joi validation
        const { error, value } = productSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.VALIDATION_ERROR,
                errors: error.details.map((detail) => detail.message),
            });
        }
        const {
            name,
            description,
            category,
            subCategory,
            brand,
            price,
            stock,
            image,
            isFeatured,
            isActive,
        } = value;
        const existingProduct = await Product.findOne({
            name,
            brand,
        });

        if (existingProduct) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.PRODUCT_ALREADY_EXISTS,
            });
        }

        const product = await Product.create({
            name,
            description,
            category,
            subCategory,
            brand,
            price,
            stock,
            image,
            isFeatured,
            isActive,
        });

        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.PRODUCT_CREATED,
            product,
        });
    } catch (error) {
        console.error("Add Product Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};


// Get All Products
const getAllProducts = async (req, res) => {
    try {
        let {
            page = 1,
            limit = 12,
            search,
            category,
            minPrice,
            maxPrice,
            sort,
        } = req.query;

        page = Number(page);
        limit = Number(limit);

        if (!Number.isInteger(page) || page < 1) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.PAGE_MUST_BE_A_POSITIVE_INTEGER,
            });
        }

        if (!Number.isInteger(limit) || limit < 1) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.LIMIT_MUST_BE_A_POSITIVE_INTEGER,
            });
        }

        if (limit > 100) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message:MESSAGES.LIMIT_CANNOT_EXCEED_100,
            });
        }

        if (
            minPrice !== undefined &&
            (isNaN(Number(minPrice)) || Number(minPrice) < 0)
        ) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.MINIMUM_PRICE_MUST_BE_A_VALID_NUMBER,
            });
        }

        if (
            maxPrice !== undefined &&
            (isNaN(Number(maxPrice)) || Number(maxPrice) < 0)
        ) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.MAXIMUM_PRICE_MUST_BE_A_VALID_NUMBER,
            });
        }

        if (
            minPrice !== undefined &&
            maxPrice !== undefined &&
            Number(minPrice) > Number(maxPrice)
        ) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.MINIMUM_PRICE_CANNOT_BE_GREATER_THAN_MAXIMUM_PRICE,
            });
        }

        const filter = {};
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i",
            };
        }

        if (category) {
            filter.category = category;
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};
            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }
            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        let sortOption = {};
        switch (sort) {
            case "priceAsc":
                sortOption.price = 1;
                break;
            case "priceDesc":
                sortOption.price = -1;
                break;
            case "newest":
                sortOption.createdAt = -1;
                break;
            case "rating":
                sortOption.rating = -1;
                break;
            default:
                sortOption.createdAt = -1;
        }

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / limit);
        const skip = (page - 1) * limit;
        const products = await Product.find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.PRODUCT_FETCHED,
            products,
            pagination: {
                page,
                limit,
                totalProducts,
                totalPages,
            },
        });

    } catch (error) {
        console.error("Get Products Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// Get Product By ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.INVALID_PRODUCT_ID,
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_FOUND,
            });
        }

        return res.status(STATUS_CODES.OK).json({
            success: true,
            product,
        });
    } catch (error) {
        console.error("Get Product By ID Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Check ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.INVALID_PRODUCT_ID,
            });
        }
        // Joi validation
        const { error, value } = productUpdateSchema.validate(
            req.body,
            {
                abortEarly: false,
            }
        );
        if (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.VALIDATION_ERROR,
                errors: error.details.map((detail) => detail.message),
            });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            value,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_FOUND,
            });
        }

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.PRODUCT_UPDATED,
            product,
        });
    } catch (error) {
        console.error("Update Product Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // Check ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.INVALID_PRODUCT_ID,
            });
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: MESSAGES.PRODUCT_NOT_FOUND,
            });
        }

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.PRODUCT_DELETED,
        });
    } catch (error) {
        console.error("Delete Product Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};


module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};