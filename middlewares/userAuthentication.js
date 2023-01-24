import createError from "../utils/createError.js";

export const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies['connect.sid'];
        // console.log(token);
        if(!token) {
            return next(createError(401, "Not logged In"))
        }
        next();
    } catch (error) {
        return next(error);
    }
}

export const isAdmin = (req, res, next) => {
    try {
        const user = req.user;
        if(user.role === 'admin') {
            next()
        } else {
            return next(createError(404, "Unauthorised, Not admin"))
        }
    } catch (error) {
        return next(error);
    }
}