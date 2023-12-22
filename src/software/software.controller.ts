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
        const search = req.query.search ? req.query.search : '';

        const softwares = await softwareCollection.aggregate([
            {
                $match: {
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } }
                    ]
                }
            },
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

        res.render('software/software_list', { softwares: softwares[0].data, totalDocs:  softwares[0].totalCount[0].total, currentPage, search});
        next();
    }

    static async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = parseInt(req.params.id);
        const software = await softwareCollection.findOne({ id });
        res.render('software/software_edit', { software });
        next();
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        console.log(req.body);
        const id = parseInt(req.params.id);
        const description = req.body.description;
        const website = req.body.website;
        const framalibre = req.body.framalibre;
        const wikipedia = req.body.wikipedia;
        const sill = req.body.sill;
        
        await softwareCollection.updateOne({ id }, {
            $set: {
                "description": description,
                "external_resources.website": website,
                "external_resources.framalibre.url": framalibre,
                "external_resources.wikipedia.url": wikipedia,
                "external_resources.sill.url": sill,
            }
        });


        res.redirect('/edit/' + id);
        next();
    }
}
