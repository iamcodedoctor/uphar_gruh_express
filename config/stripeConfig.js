import dotenv from 'dotenv'
dotenv.config();

export default {
    stripeSecret: process.env.STRIPE_SECRET
}