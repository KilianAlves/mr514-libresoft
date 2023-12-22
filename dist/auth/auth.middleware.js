"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionUser = void 0;
function sessionUser(req, res, next) {
    res.locals.user = req.session.user;
    next();
}
exports.sessionUser = sessionUser;
