import express from 'express'
import {isAuthenticated} from "../middlewares/userAuthentication.js";
import {createOrder, getMyOrders, getOrderById, processOrder, getAllOrders, orderSuccess} from "../controllers/OrderController.js";


const router = express.Router()

router.get('/success', orderSuccess )

router.post('/create', isAuthenticated, createOrder)

router.get("/myOrders", isAuthenticated, getMyOrders)

router.get("/:id", isAuthenticated, getOrderById);

router.get("/admin/orders", isAuthenticated, getAllOrders);

router.get("/admin/order/:orderId", isAuthenticated, processOrder);


export default router;