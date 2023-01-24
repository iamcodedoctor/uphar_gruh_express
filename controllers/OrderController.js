import {
    create,
    allOrders,
    getOrderDetails,
    myOrders,
    process,
} from "../services/OrderService.js";

export const createOrder = async (req, res, next) => {
    try {
        const {
            shippingInfo,
            dishes,
            paymentMethod,
        } = req.body;
        const userId = req.user._id;
        const deliveryCharges = 50;
        const response = await create({
            shippingInfo,
            dishes,
            paymentMethod,
            deliveryCharges,
            userId,
        });

        return res.status(201).json({
            success: true,
            message: "Your order is placed",
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyOrders = async (req, res, next) => {
    try {
        const userId = req.user._id;
        console.log(req.user);
        const response = await myOrders(userId);
        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const response = await getOrderDetails(id);
        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const response = await allOrders();
        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

export const processOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const response = await process(orderId);
        return res.status(200).json({
            success: true,
            message: response,
        });
    } catch (error) {
        next(error);
    }
};
