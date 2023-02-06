import express from "express"
import {connectPassport} from "../utils/Provider.js";
import session from 'express-session'
import baseConfig from "../config/baseConfig.js";
import passport from "passport";
import errorHandler from "../middlewares/errorHandler.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import {corsOptions} from "../config/corsOptions.js"

// All router imports here
import userRouter from "../routes/UserRoute.js"
import itemRouter from "../routes/ItemRoute.js"
import orderRouter from '../routes/OrderRoute.js'
import adminRouter from "../routes/adminRoute.js"

const app = express();
// Middlewares
app.use(express.json());

app.use(session({
    secret: baseConfig.sessionSecret,
    saveUninitialized: false,
    resave: true
}))

app.use(passport.authenticate('session'))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())
app.use(cors(corsOptions));

connectPassport()


// Routes
// Server test route
app.get('/', (req, res) => {
    res.status(200).send("Uphar Gruh Server reached.")
})

app.use("/api/v1", userRouter);
app.use("/api/v1/item", itemRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/admin", adminRouter)

// Error handler middleware
app.use(errorHandler);

export default app;



