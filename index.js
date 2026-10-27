import express from 'express';
import env from 'dotenv'
env.config();
import { conneciton_mongodb } from './connection.mongodb.js';
import userRouter from './routes/user.route.js';
import workspace_router from './routes/workspace.route.js';
import { auth_user } from './middleware/auth.middleware.js';

const application = express();

conneciton_mongodb(process.env.MONGODB_CONNECTION)

application.use(express.urlencoded({ extended: true }))
application.use(express.json());

application.use('/api/v1/user', userRouter)
application.use('/api/v1/workspace', auth_user, workspace_router)

application.listen(process.env.PORT, () => console.log('server is running..'))