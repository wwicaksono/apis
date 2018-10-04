import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Bluebird from 'bluebird';

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
    const validation = await UserFacade.validateOnCreate(req.body);

    if (typeof validation === 'string') {
      return res.json({
        status: false,
        message: validation,
      });
    }

    new Bluebird((resolve, reject) => {
      passport.authenticate('local', { session: false }, (errAuth, user) => {
        if (errAuth) {
          return reject(errAuth);
        }
        if (!user) {
          return reject(new Error('username/password invalid'));
        }
        return resolve(user);
      })(req, res);
    })
      .then(user => new Bluebird((resolve, reject) => {
        req.login(user, { session: false }, (loginErr) => {
          if (loginErr) {
            return reject(loginErr);
          }
          return resolve(user);
        });
      }))
      .then(user => new Bluebird((resolve, reject) => {
        jwt.sign(user.toJSON(), process.env.SECRET_KEY, { expiresIn: '1h' }, (JWTErr, token) => {
          if (JWTErr) {
            return reject(JWTErr);
          }
          return resolve(token);
        });
      }))
      .then(token => res.json({
        status: true,
        message: token,
      }))
      .catch(error => res.status(500).json({
        status: false,
        message: error.message,
      }));
  }
}

export default UserController;
