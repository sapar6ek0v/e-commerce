import {Strategy, ExtractJwt} from 'passport-jwt'
import dotenv from "dotenv";
import User from '../models/userModel.js'

dotenv.config()

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies['token'];
    }
    return token;
}

const options = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.SECRET_KEY || 'secret'
}

const jwtStrategy = new Strategy(options, (jwt, done) => {
    User.findById(jwt._id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
})

export default jwtStrategy