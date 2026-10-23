import express from 'express';
import env from 'dotenv'
env.config();
import { conneciton_mongodb } from './connection.mongodb.js';
import userRouter from './routes/user.route.js';

const application = express();

conneciton_mongodb(process.env.MONGODB_CONNECTION)

application.use('/user',userRouter)

application.listen(process.env.PORT, () => console.log('server is running..'))