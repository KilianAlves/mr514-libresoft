import express from "express";
import { SoftwareController } from "./software.controller";
import expressAsyncHandler from 'express-async-handler';
import { query } from "express-validator";

var router = express.Router();

router.get('/',
    query('page').isInt({ min: 1 }).optional(),
    query('search').isString().isLength({min: 3}).optional()
    , expressAsyncHandler(SoftwareController.list))

module.exports = router;