import {User} from "../models/User.js";

export const getMyProfile = (req, res, next) => {
    try {
        return res.status(200).json({
            success:true,
            user: req.user
        })
    } catch (error) {
        next(error);
    }
}

export const logoutUser = (req, res, next) => {
    try {
        req.session.destroy((err)=> {
            if(err) {
                return next(err)
            }
            res.clearCookie('connect.sid')
            return res.status(200).json({
                message: "Logged out successfully"
            })
        })
    } catch (error) {
        next(error);
    }
}

