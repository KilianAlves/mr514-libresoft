"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareController = void 0;
const software_collection_1 = require("./software.collection");
class SoftwareController {
    static async list(req, res, next) {
        const softwares = await software_collection_1.softwareCollection.find({}).limit(20).toArray();
        softwares.forEach((software) => {
            console.log(software);
        });
    }
}
exports.SoftwareController = SoftwareController;
