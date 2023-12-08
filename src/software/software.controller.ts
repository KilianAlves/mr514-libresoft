import { Request, Response } from "express";
import { NextFunction } from "express";
import {softwareCollection} from "./software.collection";
import { validationResult } from "express-validator";

export class SoftwareController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<void> { // mettre un size et deplacer project dans agregate

        const validation = validationResult(req)

        if (!validation.isEmpty()) {
            throw new Error("Page is less than 1 or isn't a numer");
        }

        const currentPage = req.query.page ? parseInt(req.query.page as string) : 1;

        const softwares = await softwareCollection.aggregate([
            {
                $facet: {
                    data: [
                        {
                            $project: {
                                id: 1,
                                name: 1,
                                url: 1,
                                description: 1,
                                external_resources: 1,
                                userCount: {$size: "$users"},
                            },
                        },
                        { $skip: req.query.page ? (parseInt(req.query.page as string)-1) * 20 : 0 },
                        { $limit: 20 },
                    ],
                    totalCount: [{ $count: "total" }]
                }
            },
        ]).toArray();

        if (softwares.length === 0) {
            throw new Error("page number is too high")
        }

        softwares.forEach((software: any) => {
            console.log(software);
        }
        );

        res.render('software/software_list', { softwares: softwares[0].data, totalDocs:  softwares[0].totalCount[0].total, currentPage});
        next();
    }
}
