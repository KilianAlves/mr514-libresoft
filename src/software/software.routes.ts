import express from "express";
import { SoftwareController } from "./software.controller";
import expressAsyncHandler from 'express-async-handler';

var router = express.Router();

router.get('/', expressAsyncHandler(SoftwareController.list));

module.exports = router;