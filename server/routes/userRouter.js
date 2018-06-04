import express from 'express';
import UserController from '../controller/UserController';

const userController = new UserController();

const userRouter = express.Router();

userRouter.route('/users/:iduser')
  .get(userController.get)
  .delete(userController.delete);

userRouter.route('/users')
  .put(userController.create);

export default userRouter;