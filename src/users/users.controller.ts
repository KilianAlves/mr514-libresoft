import { Request, Response } from "express";
import { NextFunction } from "express";
import { softwareCollection } from "../software/software.collection";

export class UsersController {

    static async list(req: Request, res: Response, next: NextFunction) {
        const softwares = await softwareCollection.find({})
        .project({
                id: 1,
                name: 1,
                url: 1,
                type: 1,
            }).toArray()

            softwares.forEach((software: any) => {
                console.log(software);
            }
            );
    
    }

}