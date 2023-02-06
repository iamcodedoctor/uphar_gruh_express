import express from "express";
import {
    getAllOrders,
    getAllUsers,
    processOrder,
} from "../controllers/adminController.js";
import { isAdmin, isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.get("/orders", isAuthenticated, isAdmin, getAllOrders);

router.get("/order/:orderId", isAuthenticated, isAdmin, processOrder);

router.get("/users", isAuthenticated, isAdmin, getAllUsers);

export default router;
