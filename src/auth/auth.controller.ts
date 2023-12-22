import { NextFunction, Request, Response } from "express";
import { contributorCollection } from "./auth.collection";
import bcrypt from "bcrypt";

export class AuthController {
    static loginForm(req: Request, res: Response, next: NextFunction) {
        res.render('./auth/auth_loginform');
        next();
    }

    static async login(req: Request, res: Response) {
        const user = (await contributorCollection.find({ name: req.body.login }).toArray())[0];

        if (user === null) {
            throw new Error("Utilisateur inconnu");
        }

        if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
            req.session.regenerate(function() {});
            req.session.user = user;

            res.redirect('/');
        } else {
            throw new Error("Mot de passe incorrect");
        }
    }

    static logout(req: Request, res: Response) {
        req.session.destroy(function () { });
        
        res.redirect('/');
    }
}