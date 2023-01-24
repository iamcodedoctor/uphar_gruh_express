import dotenv from 'dotenv'
dotenv.config();

export default {
    port: process.env.PORT,
    dbUri: process.env.DATABASE_URI,
    clientId: process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_SECRET,
    googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,
    sessionSecret: process.env.SESSION_SECRET,
    frontendUrl: process.env.SUCCESS_FRONTEND_URL,
    stripeSecret: process.env.STRIPE_SECRET
};