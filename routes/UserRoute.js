import express from "express";
import passport from "passport";
import baseConfig from "../config/baseConfig.js";
import { getMyProfile, logoutUser } from "../controllers/UserController.js";
import { isAuthenticated } from "../middlewares/userAuthentication.js";

const router = express.Router();

router.get(
    "/googleLogin",
    passport.authenticate("google", {
        scope: ["profile"],
    })
);

router.get(
    "/login",
    passport.authenticate("google", {
        scope: ["profile"],
        successRedirect: baseConfig.frontendUrl,
    })
);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/logout", logoutUser);

export default router;
