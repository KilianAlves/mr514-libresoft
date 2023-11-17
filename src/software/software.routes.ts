import express from "express";
import { SoftwareController } from "./software.controller";
import { userInfo } from "os";

var router = express.Router();

router.get('/', SoftwareController.list);

module.exports = router;