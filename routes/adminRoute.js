import express from 'express'
import { getAllOrders, getAllUsers } from '../controllers/adminController.js';
import {isAuthenticated} from "../middlewares/userAuthentication.js";

const router = express.Router()

router.get('/orders', isAuthenticated, getAllOrders )

router.get('/order/:orderId', isAuthenticated )

router.get('/users', isAuthenticated, getAllUsers )

export default router;
