"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const software_collection_1 = require("../software/software.collection");
class UsersController {
    static async list(req, res, next) {
        let users;
        if (req.params.id === undefined) {
            users = await software_collection_1.softwareCollection.distinct("users");
        }
        else {
            const id = parseInt(req.params.id);
            const softUsers = await software_collection_1.softwareCollection.find({
                id: id
            })
                .project({
                users: 1,
            }).toArray();
            users = softUsers[0].users;
        }
        users = users.sort(function (a, b) {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            if (nameA > nameB) {
                return 1;
            }
            if (nameA < nameB) {
                return -1;
            }
            return 0;
        });
        res.render('user/user_list', { users: users });
        next();
    }
}
exports.UsersController = UsersController;
