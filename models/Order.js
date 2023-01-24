import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    shippingInfo: {
        houseNo: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        },
    },
    items: {
        type: [],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Online"],
        default: "COD"
    },
    stripeId: {
        type: String,
    },
    paidAt: {
        type: Date
    },
    deliveryCharges: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    orderStatus: {
        type: String,
        enum: ["Preparing", "Shipped", "Delivered"],
        default: "Preparing"
    },
    deliveredAt: Date
}, {
    timestamps: true
})

export const Order = mongoose.model('Order', schema)