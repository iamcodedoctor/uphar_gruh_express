import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import passport from "passport";
import {User} from "../models/User.js"
import baseConfig from "../config/baseConfig.js";

const connectPassport = () => {
    passport.use('google', new GoogleStrategy({
            clientID: baseConfig.clientId,
            clientSecret: baseConfig.clientSecret,
            callbackURL: baseConfig.googleCallbackUrl,
            passReqToCallback: true
        },
        async function (accessToken, refreshToken, profile, done) {
            const user = await User.findOne({
                googleId: profile.id,
            })

            if(!user) {
                const newUser = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    photo: profile.photos[0].values
                })
                return done(null, newUser)
            } else {
                return done(null, user)
            }

        }
    ))

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    })

}

export {connectPassport};