import express from "express";
import { isAuthenticated } from "../middlewares/userAuthentication.js";
import {
    createOrder,
    getMyOrders,
    getOrderById,
    orderSuccess,
} from "../controllers/OrderController.js";

const router = express.Router();

router.get("/success", orderSuccess);

router.post("/create", isAuthenticated, createOrder);

router.get("/myOrders", isAuthenticated, getMyOrders);

router.get("/:id", isAuthenticated, getOrderById);

export default router;
