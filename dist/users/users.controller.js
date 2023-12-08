"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const software_collection_1 = require("../software/software.collection");
class UsersController {
    static async list(req, res, next) {
        const softwares = await software_collection_1.softwareCollection.find({})
            .project({
            id: 1,
            name: 1,
            url: 1,
            type: 1,
        }).toArray();
        softwares.forEach((software) => {
            console.log(software);
        });
    }
}
exports.UsersController = UsersController;
