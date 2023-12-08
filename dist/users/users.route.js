"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const users_controller_1 = require("./users.controller");
var usersRouter = express_1.default.Router();
usersRouter.get('/:id', (0, express_async_handler_1.default)(users_controller_1.UsersController.list));
module.exports = usersRouter;
