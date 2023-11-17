import { Request, Response } from "express";
import { NextFunction } from "express";
import {softwareCollection} from "./software.collection";

export class SoftwareController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const softwares = await softwareCollection.find({}).project({
            id: 1,
            name: 1,
            website: 1,
            description: 1
        }).limit(20).toArray();

        softwares.forEach((software: any) => {
            console.log(software);
        }
        );
    }
}
