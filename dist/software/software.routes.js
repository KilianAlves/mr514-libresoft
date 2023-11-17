"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const software_controller_1 = require("./software.controller");
var router = express_1.default.Router();
router.get('/', software_controller_1.SoftwareController.list);
module.exports = router;
