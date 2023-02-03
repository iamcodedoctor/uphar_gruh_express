import { User } from "../models/User.js";
import {
    allOrders,
    process,
} from "../services/OrderService.js";

export const getAllOrders = async (req, res, next) => {
    try {
        const {page, limit} = req.query;
        const response = await allOrders({page, limit});
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

export const getAllUsers = async  (req, res, next) => {
    try {
        let {page, limit} = req.query;
        page = page || 0;
        limit = limit || 10;
        const documentCount = await User.countDocuments();
        const users = await User.find({}).skip(page*limit).limit(limit).lean();
        return res.status(200).json({
            success: true,
            data: {
                documentCount,
                data: users
            }
        })
    } catch (error) {
        next(error);
    }
}