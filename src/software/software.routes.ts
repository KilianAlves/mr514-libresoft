import express from "express";
import { SoftwareController } from "./software.controller";
import expressAsyncHandler from 'express-async-handler';
import { param, query } from "express-validator";

var router = express.Router();

router.get('/',
    query('page').isInt({ min: 1 }).optional(),
    query('search').isString().isLength({min: 3}).optional()
    , expressAsyncHandler(SoftwareController.list))

router.get('/edit/:id', param('id').isInt(), expressAsyncHandler(SoftwareController.edit))

router.post('/edit/:id', param('id').isInt(), express.urlencoded(), expressAsyncHandler(SoftwareController.update))

module.exports = router;