import express from 'express';
import UserController from '../controller/UserController';
import auth from '../library/auth';

const userController = new UserController();

const userRouter = express.Router();

userRouter.route('/users/:id')
    .get(userController.get)
    .delete(userController.delete);

userRouter.route('/users')
    .get(auth.authenticate('jwt', {session: false}), userController.get)
    .post(userController.verify)
    .put(userController.create);

export default userRouter;