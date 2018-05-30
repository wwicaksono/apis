import express from 'express';
import BookController from '../controller/BookController';

const {
    create, get
} = new BookController();

const bookRouter = express.Router();

bookRouter.route('/books')
  .post(create)
  .get(get);

export default bookRouter;