import { Request, Response } from "express";
import { NextFunction } from "express";
import {softwareCollection} from "./software.collection";

export class SoftwareController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
        const softwares = await softwareCollection.find({}).limit(20).toArray();

        softwares.forEach((software: any) => {
            console.log(software);
        }
        );
    }
}
