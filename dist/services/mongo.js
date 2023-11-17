"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongodb = void 0;
require("dotenv/config");
const mongodb_1 = require("mongodb");
const uri = `mongodb://${process.env.username}:${process.env.password}@localhost:27017`;
const client = new mongodb_1.MongoClient(uri);
exports.mongodb = client.db('mr514');
