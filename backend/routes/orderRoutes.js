import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userId, items, totalPrice, date } = req.body;

    if (!userId || !items || !totalPrice) {
      return res.status(400).json({ message: "Missing order details" });
    }

    const newOrder = new Order({ userId, items, totalPrice, date });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).json({ message: "Failed to place order" });
  }
});

export default router;
