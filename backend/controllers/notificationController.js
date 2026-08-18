const Notification = require("../models/notificationModel");

const {
    STATUS_CODES,
    MESSAGES,
} = require("../utils/setConflicts");

// Get My Notifications
const getMyNotifications = async (req, res) => {
    try {

        const notifications = await Notification.find({
            user: req.user.userId,
        })
            .populate("order")
            .sort({
                createdAt: -1,
            });

        const unreadCount = await Notification.countDocuments({
            user: req.user.userId,
            isRead: false,
        });
        return res.status(STATUS_CODES.OK).json({
            success: true,
            message: "Notifications fetched successfully",
            totalNotifications: notifications.length,
            unreadCount,
            notifications,
        });
    } catch (error) {
        console.error(
            "Get Notifications Error:",
            error
        );

        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// Mark Notification As Read
const markNotificationAsRead = async (req, res) => {
    try {

        const notification = await Notification.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!notification) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "Notification not found",
            });
        }

        notification.isRead = true;

        await notification.save();

        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: "Notification marked as read",
            notification,
        });

    } catch (error) {
        console.error(
            "Mark Notification Error:",
            error
        );
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// Mark All Notifications As Read
const markAllNotificationsAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            {
                user: req.user.userId,
                isRead: false,
            },
            {
                $set: {
                    isRead: true,
                },
            }
        );
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: "All notifications marked as read",
        });
    } catch (error) {
        console.error(
            "Mark All Notifications Error:",
            error
        );
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

// Delete Notification
const deleteNotification = async (req, res) => {
    try {
        const notification =
            await Notification.findOneAndDelete({
                _id: req.params.id,
                user: req.user.userId,
            });
        if (!notification) {
            return res.status(
                STATUS_CODES.NOT_FOUND
            ).json({
                success: false,
                message: "Notification not found",
            });
        }
        return res.status(
            STATUS_CODES.OK
        ).json({
            success: true,
            message: "Notification deleted successfully",
        });
    } catch (error) {
        console.error(
            "Delete Notification Error:",
            error
        );
        return res.status(
            STATUS_CODES.INTERNAL_SERVER_ERROR
        ).json({
            success: false,
            message: MESSAGES.SERVER_ERROR,
            error: error.message,
        });
    }
};

module.exports = {
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
};