import express from 'express';
import logger from 'morgan';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import booksRouter from './routes/booksRouter';

const server = express();
const port = process.env.PORT || 7000;

dotenv.load();

// Middleware
server.use(logger(':method :url :status :response-time ms :: :res[content-length] ":referrer" ":user-agent"'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Router
server.use('/v1/apis', booksRouter);

// Server init
server.listen(port, () => {
  console.info(`Connected on port: ${port}`);
});
