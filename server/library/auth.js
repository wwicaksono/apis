import passport from 'passport';
import strategy from 'passport-local';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';

const LocalStrategy = strategy.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  async (username, password, cb) => {
    try {
      const userData = await UserModel.findOne({ where: { username } });
      if (userData) {
        const result = await bcrypt.compare(password, userData.password);

        if (result) return cb(null, userData, { message: 'Logged In Successfully' });
      }
    } catch (error) {
    //   console.error(error);
      cb(error);
    }
    return cb(null, false, { message: 'Incorrect email or password.' });
  },
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
  },
  (jwtPayload, cb) => cb(null, jwtPayload),
));

export default passport;
