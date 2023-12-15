import express from "express";
import expressAsyncHandler from 'express-async-handler';
import { UsersController } from "./users.controller";

var usersRouter = express.Router();


usersRouter.get('/:id?', expressAsyncHandler(UsersController.list))

module.exports = usersRouter;