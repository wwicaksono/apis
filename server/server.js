import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import logger from './library/logger';
import userRouter from './routes/userRouter';

const server = express();
const port = process.env.PORT || 7000;


// Middleware
server.use(morgan(':method :url :status :response-time ms :: :res[content-length] ":referrer" ":user-agent"'), { stream: logger.stream });
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Router
server.use('/v1/apis', userRouter);

process.on('unhandledRejection', (err) => {
  logger.error(err.stack);
  // process.exit(1);
});

// Server init
server.listen(port, () => {
  logger.info(`::: Connected on port: ${port} :::`);
});
