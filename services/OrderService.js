import baseConfig from "../config/baseConfig.js";
import { Item } from "../models/Item.js";
import { Order } from "../models/Order.js";
import createError from "../utils/createError.js";
import Stripe from "stripe";
const stripe = Stripe(baseConfig.stripeSecret);

export const create = ({
    shippingInfo,
    dishes,
    paymentMethod,
    deliveryCharges,
    userId,
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const lineItems = await Promise.all(
                dishes.map(async (dish) => {
                    const item = await Item.findById(dish._id);
                    return {
                        price_data: {
                            currency: "INR",
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: (item.price + 50) * 100,
                        },
                        quantity: dish.quantity,
                    };
                })
            );
            const paidAt = Date.now();
            let sum = 0;
            lineItems.map((item) => {
                sum += item.price_data.unit_amount * item.quantity;
            });
            if (paymentMethod === "COD") {
                const newOrder = Order.create({
                    shippingInfo,
                    paymentMethod,
                    paidAt,
                    deliveryCharges,
                    totalAmount: sum,
                    userId,
                    items: lineItems,
                });
                return resolve(newOrder);
            } else {
                const session = await stripe.checkout.sessions.create({
                    success_url: `${baseConfig.frontendUrl}/paymentSuccess`,
                    cancel_url: `${baseConfig.frontendUrl}/paymentFailure`,
                    mode: "payment",
                    line_items: lineItems,
                    payment_method_types: ["card"],
                });

                const newOrder = await Order.create({
                    shippingInfo,
                    paymentMethod,
                    paidAt,
                    deliveryCharges,
                    totalAmount: sum,
                    userId,
                    items: lineItems,
                    stripeId: session.id,
                });

                return resolve({ stripeSession: session, ...newOrder });
            }
        } catch (error) {
            return reject(error);
        }
    });
};

export const myOrders = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const myOrders = await Order.find({ userId })
                .populate("userId", "name")
                .lean();
            return resolve(myOrders);
        } catch (error) {
            return reject(error);
        }
    });
};

export const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(id)
                .populate("userId", "name")
                .lean();
            if (!order) {
                return reject(createError(404, "Invalid Order Id"));
            }
            return resolve(order);
        } catch (error) {
            return reject(error);
        }
    });
};

export const allOrders = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const orders = await Order.find().populate("userId", "name").lean();
            return resolve(orders);
        } catch (error) {
            return reject(error);
        }
    });
};

export const process = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById(orderId);
            if (order.orderStatus === "Delivered") {
                return reject(createError(400, "Order Already Delivered"));
            } else if (order.orderStatus === "Shipped") {
                order.orderStatus = "Delivered";
                order.deliveredAt = Date.now();
            } else if (order.orderStatus === "Preparing") {
                order.orderStatus = "Shipped";
            }

            await order.save();
            return resolve("Order Processed successfully");
        } catch (error) {
            return reject(error);
        }
    });
};
