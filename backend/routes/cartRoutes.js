const express = require("express");
const {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post(
    "/",
    authMiddleware,
    addToCart
);

router.get(
    "/",
    authMiddleware,
    getCart
);

router.put(
    "/:id",
    authMiddleware,
    updateCart
);

router.delete(
    "/:id",
    authMiddleware,
    removeCartItem
);

router.delete(
    "/",
    authMiddleware,
    clearCart
);


module.exports = router;