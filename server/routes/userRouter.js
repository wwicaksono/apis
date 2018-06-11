import express from 'express';
import UserController from '../controller/UserController';
import auth from '../library/auth';

const userRouter = express.Router();

userRouter.route('/users/:id')
  .get(UserController.get)
  .delete(UserController.delete);

userRouter.route('/users')
  .get(auth.authenticate('jwt', { session: false }), UserController.get)
  .post(UserController.verify)
  .put(UserController.create);

export default userRouter;
