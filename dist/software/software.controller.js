"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareController = void 0;
const software_collection_1 = require("./software.collection");
class SoftwareController {
    static async list(req, res, next) {
        const softwares = await software_collection_1.softwareCollection.aggregate({}).project({
            id: 1,
            name: 1,
            url: 1,
            description: 1,
            external_resources: 1
        }).limit(20).toArray();
        softwares.forEach((software) => {
            console.log(software);
        });
        res.render('software/software_list', { softwares });
        next();
    }
}
exports.SoftwareController = SoftwareController;
