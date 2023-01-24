import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
})

export const Item = mongoose.model("Item", schema);