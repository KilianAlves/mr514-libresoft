"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareSchema = exports.softwareCollection = void 0;
const mongo_1 = require("../services/mongo");
exports.softwareCollection = mongo_1.mongodb.collection('software');
class SoftwareSchema {
    static async showInvalidDocuments() {
        console.log((await exports.softwareCollection.find({ $nor: [SoftwareSchema.schema] }).toArray()).map((s) => [s.name, s.id]));
    }
}
exports.SoftwareSchema = SoftwareSchema;
SoftwareSchema.schema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['name'],
        properties: {
            _id: {},
            name: {
                bsonType: 'string',
                description: "'name' is required and is a string"
            },
        }
    }
};
