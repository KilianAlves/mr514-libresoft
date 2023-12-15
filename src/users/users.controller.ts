import { Request, Response } from "express";
import { NextFunction } from "express";
import { softwareCollection } from "../software/software.collection";

export class UsersController {

    static async list(req: Request, res: Response, next: NextFunction) {
        let users;
        if(req.params.id === undefined){
            users = await softwareCollection.distinct("users");
        }
        else{
            const id = parseInt(req.params.id);
            const softUsers = await softwareCollection.find(
                {
                    id: id
                }
                )
            .project({
                    users: 1,
                }).toArray()
            users = softUsers[0].users;
        }
        users = users.sort(function(a: SoftwareUsers, b: SoftwareUsers) {
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
        res.render('user/user_list', { users: users});
        next();
    
    }

}