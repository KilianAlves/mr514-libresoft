import { Request, Response } from "express";
import { NextFunction } from "express";
import {softwareCollection} from "./software.collection";

export class SoftwareController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const softwares = await softwareCollection.find({}).project({
            id: 1,
            name: 1,
            url: 1,
            description: 1,
            external_resources: 1
        }).limit(20).toArray();

        softwares.forEach((software: any) => {
            console.log(software);
        }
        );

        res.render('software/software_list', { softwares });
        next();
    }
}
