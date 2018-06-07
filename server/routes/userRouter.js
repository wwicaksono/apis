import express from 'express';
import UserController from '../controller/UserController';

const userController = new UserController();

const userRouter = express.Router();

userRouter.route('/users/:id')
    .get(userController.get)
    .delete(userController.delete);

userRouter.route('/users')
    .get(userController.get)
    .post(userController.verify)
    .put(userController.create);

export default userRouter;