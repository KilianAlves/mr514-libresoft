"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const auth_middleware_1 = require("./auth/auth.middleware");
require('dotenv').config();
var routes = require('./software/software.routes');
var usersRouter = require('./users/users.routes');
var authRouter = require('./auth/auth.routes');
const app = (0, express_1.default)();
// Session
app.use((0, express_session_1.default)({
    secret: process.env.session_secret,
    saveUninitialized: false,
    resave: false
}));
app.use(auth_middleware_1.sessionUser);
app.use('/', routes);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
const port = process.env.port;
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
// Gestion des erreurs
app.use((err, req, res, next) => {
    console.log(`ERREUR : ${err.message}`);
    (0, auth_middleware_1.sessionUser)(req, res, next);
    res.render('error', { err });
});
app.listen(port, () => {
    console.log(`Server local démarré : http://localhost:${port}`);
});
