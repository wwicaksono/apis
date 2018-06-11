import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/UserModel';
import UserFacade from '../facade/UserFacade';

class UserController {
  static async create(req, res) {
    const username = req.body.username || null;
    const password = req.body.password || null;

    let hash = null;
    if (password) { hash = await bcrypt.hash(password, 5); }

    try {
      const result = await UserModel.findOrCreate({
        where: {
          username,
        },
        defaults: {
          password: hash,
        },
      });

      if (result[1]) {
        res.json('user created');
      } else {
        res.json('username exists');
      }
    } catch (error) {
      res.json('error');
      throw error;
    }
  }

  static async get(req, res) {
    const id = req.params.id || null;

    const users = id ? await UserModel.findById(id) : await UserModel.findAll();

    return res.json(users);
  }

  static delete(req, res) {
    return res.status(200).json('deleted');
  }

  static async verify(req, res) {
    const userFacade = new UserFacade();
    const validation = await userFacade.validateOnCreate(req.body);

    if (typeof validation === 'string') {
      return res.json({
        status: false,
        message: validation,
      });
    }

    passport.authenticate('local', { session: false }, (err, user) => {
      if (err || !user) {
        return res.status(500).json({
          status: false,
          message: err || 'user not exist',
        });
      }

      req.login(user, { session: false }, (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return res.status(500).send(err);
        }

        jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '1h' }, (JWTErr, token) => {
          if (JWTErr) {
            console.error(JWTErr);
            return res.status(500).json({
              status: false,
              message: err,
            });
          }
          return res.json({ status: true, message: token });
        });
      });
    })(req, res);
  }
}

export default UserController;
