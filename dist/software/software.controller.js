"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareController = void 0;
const software_collection_1 = require("./software.collection");
const express_validator_1 = require("express-validator");
class SoftwareController {
    static async list(req, res, next) {
        const validation = (0, express_validator_1.validationResult)(req);
        if (!validation.isEmpty()) {
            throw new Error("Page is less than 1 or isn't a numer");
        }
        const currentPage = req.query.page ? parseInt(req.query.page) : 1;
        const search = req.query.search ? req.query.search : '';
        const softwares = await software_collection_1.softwareCollection.aggregate([
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
                                userCount: { $size: "$users" },
                            },
                        },
                        { $skip: req.query.page ? (parseInt(req.query.page) - 1) * 20 : 0 },
                        { $limit: 20 },
                    ],
                    totalCount: [{ $count: "total" }]
                }
            },
        ]).toArray();
        if (softwares.length === 0) {
            throw new Error("page number is too high");
        }
        softwares.forEach((software) => {
            console.log(software);
        });
        res.render('software/software_list', { softwares: softwares[0].data, totalDocs: softwares[0].totalCount[0].total, currentPage, search });
        next();
    }
}
exports.SoftwareController = SoftwareController;
