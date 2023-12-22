"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_collection_1 = require("../auth.collection");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    static loginForm(req, res, next) {
        res.render('./auth/auth_loginform');
        next();
    }
    static async login(req, res) {
        const user = (await auth_collection_1.contributorCollection.find({ name: req.body.login }).toArray())[0];
        if (user === null) {
            throw new Error("Utilisateur inconnu");
        }
        if (await bcrypt_1.default.compare(req.body.password, user.hashedPassword)) {
            req.session.regenerate(function () { });
            req.session.user = user;
            res.redirect('/');
        }
        else {
            throw new Error("Mot de passe incorrect");
        }
    }
    static logout(req, res) {
        req.session.destroy(function () { });
        res.redirect('/');
    }
}
exports.AuthController = AuthController;
