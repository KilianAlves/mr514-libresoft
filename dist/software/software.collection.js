"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softwareCollection = void 0;
const mongo_1 = require("../services/mongo");
exports.softwareCollection = mongo_1.mongodb.collection('software');
