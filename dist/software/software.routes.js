"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const software_controller_1 = require("./software.controller");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const express_validator_1 = require("express-validator");
var router = express_1.default.Router();
router.get('/', (0, express_validator_1.query)('page').isInt({ min: 1 }).optional(), (0, express_validator_1.query)('search').isString().isLength({ min: 3 }).optional(), (0, express_async_handler_1.default)(software_controller_1.SoftwareController.list));
module.exports = router;
