import passport from "passport";
const GoogleStrategy = require('passport-google-oauth20').Strategy;


// let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
// let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
// let callbackURL = `${process.env.BACKEND_URL}/api/v1/auth/google/callback`

let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
let callbackURL = `${process.env.BACKEND_URL}/api/v1/auth/google/callback`


passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL
    },
    function(accessToken, refreshToken, profile, cb) {
        cb(null, {
            id: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos ? profile.photos[0].value : "",
        })
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});
