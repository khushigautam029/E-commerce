const express = require("express");

const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById
} = require("../controllers/userController");

const router = express.Router();

// Register
router.post("/register", registerUser);
// Login
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;