const express = require("express");

const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    getProfile,
    updateProfile,
    changePassword,
    deleteAccount,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Register
router.post("/register", registerUser);
router.get("/profile",authMiddleware, getProfile);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/profile",authMiddleware,updateProfile);
router.put("/change-password",authMiddleware,changePassword);
router.delete("/account",authMiddleware,deleteAccount);

module.exports = router;