import { Request, Response } from "express";
import { NextFunction } from "express";

export class SoftwareController {
    static list(req: Request, res: Response, next: NextFunction): void {
        throw new Error("Ceci est un message d'erreur");
    }
}
