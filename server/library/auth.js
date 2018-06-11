import passport from "passport";
import strategy from "passport-local";
import passportJWT from "passport-jwt";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";

const LocalStrategy = strategy.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    async (username, password, cb) => {
        try {
            const user_data = await UserModel.findOne({ where: { username: username } });
            if (user_data) {
                const result = await bcrypt.compare(password, user_data.password);

                if (result) return cb(null, user_data, { message: 'Logged In Successfully' });;
            }
            return cb(null, false, { message: 'Incorrect email or password.' });
        } catch (error) {
            console.error(error);
            cb(error);
        }
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
},
    (jwtPayload, cb) => {
        return cb(null, jwtPayload);
    }
));

export default passport;