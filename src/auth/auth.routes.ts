import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { AuthController } from './auth.controller';

export const authRouter = express.Router();

authRouter.get('/',
    AuthController.loginForm
);

authRouter.get('/logout',
    AuthController.logout
);

authRouter.post('/login',
    express.urlencoded(),
    expressAsyncHandler(AuthController.login)
);

module.exports = authRouter;