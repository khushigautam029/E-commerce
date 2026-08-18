const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { STATUS_CODES, MESSAGES } = require("../utils/setConflicts");

const {
    signupSchema,
    loginSchema,
    updateProfileSchema,
    deleteAccountSchema,
    changePasswordSchema,
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


// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Users fetched successfully",
            totalUsers: users.length,
            users,
        });
    } catch (error) {
        console.error("Get Users Error:", error);
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
        });
    }
};

// Get User By ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password");
        if (!user) {
            return res.status(STATUS_CODES.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        console.error("Get User By ID Error:", error);
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
        });
    }
};

// Get Current User Profile
exports.getProfile = async (req, res) => {
    try {
        const user =
            await User.findById(
                req.user.userId
            ).select("-password");
        if (!user) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:
                "Profile fetched successfully",
            user,
        });
    } catch (error) {
        console.error(
            "Get Profile Error:",
            error
        );
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message:
                MESSAGES.SERVER_ERROR,
        });
    }
};

// Update Current User Profile
exports.updateProfile = async (req, res) => {
    try {
        const { error, value } =
            updateProfileSchema.validate(
                req.body,
                {
                    abortEarly: false,
                }
            );
        if (error) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(
                    (detail) => detail.message
                ),
            });
        }
        const user =
            await User.findById(
                req.user.userId
            );
        if (!user) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "User not found",
            });
        }
        // Check username
        if (
            value.username &&
            value.username !== user.username
        ) {
            const existingUsername =
                await User.findOne({
                    username: value.username,
                    _id: {
                        $ne: user._id,
                    },
                });

            if (existingUsername) {
                return res.status(
                    STATUS_CODES.BAD_REQUEST
                ).json({
                    success: false,
                    message:
                        "Username already exists",
                });
            }
        }
        // Check phone
        if (
            value.phone &&
            value.phone !== user.phone
        ) {
            const existingPhone =
                await User.findOne({
                    phone: value.phone,
                                    _id: {
                        $ne: user._id,
                    },
                });
            if (existingPhone) {
                return res.status(
                    STATUS_CODES.BAD_REQUEST
                ).json({
                    success: false,
                    message:
                        "Phone number already exists",
                });
            }
        }
        if (
            value.email &&
            value.email !== user.email
        ) {
            const existingEmail =
                await User.findOne({
                    email: value.email,
                    _id: {
                        $ne: user._id,
                    },
                });
            if (existingEmail) {
                return res.status(
                    STATUS_CODES.BAD_REQUEST
                ).json({
                    success: false,
                    message:
                        "Email already exists",
                });
            }
        }
        // Update only supplied fields
        if (value.username !== undefined) {
            user.username = value.username;
        }
        if (value.phone !== undefined) {
            user.phone = value.phone;
        }
        if (value.email !== undefined) {
            user.email = value.email;
        }
        await user.save();
        const updatedUser =
            user.toObject();
        delete updatedUser.password;
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:
                "Profile updated successfully",
                    user: updatedUser,
        });
    } catch (error) {
        console.error(
            "Update Profile Error:",
            error
        );
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message:
                MESSAGES.SERVER_ERROR,
        });
    }
};

// Change Password
exports.changePassword = async (req, res) => {
    try {
        const { error, value } =
            changePasswordSchema.validate(
                req.body,
                {
                    abortEarly: false,
                }
            );
        if (error) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(
                    (detail) => detail.message
                ),
            });
        }
        const {
            currentPassword,
            newPassword,
        } = value;
        const user =
            await User.findById(
                req.user.userId
            );
        if (!user) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "User not found",
            });
        }

        // Check current password
        const isMatch =
            await bcrypt.compare(
                currentPassword,
                user.password
            );
            if (!isMatch) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message:
                    "Current password is incorrect",
            });
        }
        // Prevent same password
        const samePassword =
            await bcrypt.compare(
                newPassword,
                user.password
            );
        if (samePassword) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message:
                    "New password must be different from current password",
            });
        }
        user.password =
            await bcrypt.hash(
                newPassword,
                10
            );

        await user.save();
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:
                "Password changed successfully",
        });
    } catch (error) {
        console.error(
            "Change Password Error:",
            error
        );

        return res.status(
        STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message:
                MESSAGES.SERVER_ERROR,
        });
    }
};

// Delete Current User Account
exports.deleteAccount = async (req, res) => {
    try {
        const { error, value } =
            deleteAccountSchema.validate(
                req.body,
                {
                    abortEarly: false,
                }
            );
        if (error) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message: "Validation failed",
                errors: error.details.map(
                    (detail) => detail.message
                ),
            });
        }
        const user =
            await User.findById(
                req.user.userId
            );
        if (!user) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "User not found",
            });
        }
        const isMatch =
            await bcrypt.compare(
                value.password,
                user.password
            );
        if (!isMatch) {
            return res.status(
                STATUS_CODES.BAD_REQUEST
            ).json({
                success: false,
                message:
                    "Incorrect password",
            });
        }
        await User.findByIdAndDelete(
            req.user.userId
        );
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message:
                "Account deleted successfully",
        });
    } catch (error) {
        console.error(
            "Delete Account Error:",
            error
        );
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message:
                MESSAGES.SERVER_ERROR,
        });
    }
};