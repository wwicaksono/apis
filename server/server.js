import 'dotenv/config';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import userRouter from './routes/userRouter';

const server = express();
const port = process.env.PORT || 7000;

// Middleware
server.use(logger(':method :url :status :response-time ms :: :res[content-length] ":referrer" ":user-agent"'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Router
server.use('/v1/apis', userRouter);

process.on('unhandledRejection', function(err){
    console.error(err.stack);
    // process.exit(1);
});

// Server init
server.listen(port, () => {
  console.info(`::: Connected on port: ${port} :::`);
});
