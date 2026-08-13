const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { STATUS_CODES, MESSAGES } = require("../utils/setConflicts");

const {
    signupSchema,
    loginSchema,
} = require("../validation/userValidation");


// Register User
exports.registerUser = async (req, res) => {
    try {
        // Joi validation
        const { error, value } = signupSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((detail) => detail.message),
            });
        }

        const {
            username,
            phone,
            password,
            email,
        } = value;

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.USER_ALREADY_EXISTS,
            });
        }
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: "Phone number already exists",
            });
        }

        if (email) {
            const existingEmail = await User.findOne({ email });

            if (existingEmail) {
                return res.status(STATUS_CODES.BAD_REQUEST).json({
                    success: false,
                    message: "Email already exists",
                });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            phone,
            password: hashedPassword,
            email,
        });
        await user.save();
        return res.status(STATUS_CODES.CREATED).json({
            success: true,
            message: MESSAGES.REGISTER_SUCCESS,
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
        });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        // Joi validation
        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map((detail) => detail.message),
            });
        }
        const {
            email,
            password,
        } = value;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.INVALID_CREDENTIALS,
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(STATUS_CODES.BAD_REQUEST).json({
                success: false,
                message: MESSAGES.INVALID_CREDENTIALS,
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: MESSAGES.LOGIN_SUCCESS,
            token,
            user: {
                id: user._id,
                username: user.username,
                phone: user.phone,
                email: user.email,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
        });
    }
};