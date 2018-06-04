import express from 'express';
import BookController from '../controller/BookController';

const bookController = new BookController();

const bookRouter = express.Router();

bookRouter.route('/books')
  .put(bookController.create)
  .get(bookController.get);

export default bookRouter;