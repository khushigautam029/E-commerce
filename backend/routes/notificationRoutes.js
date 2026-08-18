const express = require("express");

const {
    getMyNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
} = require("../controllers/notificationController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Get logged-in user's notifications
router.get(
    "/",
    authMiddleware,
    getMyNotifications
);


// Mark one notification as read
router.put(
    "/:id/read",
    authMiddleware,
    markNotificationAsRead
);


// Mark all notifications as read
router.put(
    "/read-all",
    authMiddleware,
    markAllNotificationsAsRead
);


// Delete one notification
router.delete(
    "/:id",
    authMiddleware,
    deleteNotification
);

module.exports = router;