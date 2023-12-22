"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const auth_controller_1 = require("../auth.controller");
exports.authRouter = express_1.default.Router();
exports.authRouter.get('/', auth_controller_1.AuthController.loginForm);
exports.authRouter.get('/logout', auth_controller_1.AuthController.logout);
exports.authRouter.post('/login', express_1.default.urlencoded(), (0, express_async_handler_1.default)(auth_controller_1.AuthController.login));
