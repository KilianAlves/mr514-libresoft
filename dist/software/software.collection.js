"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareSchema = exports.softwareCollection = void 0;
const mongo_1 = require("../services/mongo");
exports.softwareCollection = mongo_1.mongodb.collection('software');
class SoftwareSchema {
    static async showInvalidDocuments() {
        console.log((await exports.softwareCollection.find({ $nor: [SoftwareSchema.schema] }).toArray()).map((s) => [s.name, s.id]));
    }
    static async applyToCollection() {
        await mongo_1.mongodb.command({
            collMod: 'software',
            validator: SoftwareSchema.schema
        });
    }
    static async dumpFromCollection() {
        const options = await exports.softwareCollection.options();
        console.log('softwareSchema :');
        console.dir(options.validator, { depth: null });
    }
}
exports.SoftwareSchema = SoftwareSchema;
SoftwareSchema.schema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'url', 'id', 'description'],
        properties: {
            _id: {},
            name: {
                bsonType: 'string',
                description: "'name' is required and is a string"
            },
            url: {
                bsonType: 'string',
            },
            id: {
                bsonType: 'number',
                minimum: 5,
            },
            description: {
                bsonType: 'string',
            },
            external_ressources: {
                bsonType: "object",
                properties: {
                    "wikipedia": { bsonType: "object" },
                    "wikidata": { bsonType: "object" },
                    "framalibre": { bsonType: "object" },
                    "sill": { bsonType: "object" },
                    "website": { bsonType: "string" },
                    "repository": { bsonType: "string" },
                }
            },
            users: {
                bsonType: ["array"],
                uniqueItems: true,
                items: {
                    bsonType: ["object"],
                    properties: {
                        id: { bsonType: "number" },
                        name: { bsonType: "string" },
                        url: { bsonType: "string" },
                        type: { bsonType: "string" },
                    }
                }
            }
        }
    }
};
