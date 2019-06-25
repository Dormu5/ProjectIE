import passport from 'passport';
import User from '../models/user';
import passportJWT from 'passport-jwt';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


function verifyCallback(payload, done) {
    return User.findOne({
        _id: payload.id
    }).then(user => {
        return done(null, user);
    }).catch(err =>{
        return done(err);
    });
}

export default () => {
    const config = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };
    passport.use(User.createStrategy());
    passport.use(new JWTStrategy(config, verifyCallback));
}
