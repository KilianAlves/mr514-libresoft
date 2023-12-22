"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContributorSchema = exports.seedContributors = exports.contributorCollection = void 0;
const mongo_1 = require("../services/mongo");
exports.contributorCollection = mongo_1.mongodb.collection('contributors');
async function seedContributors() {
    const bcrypt = require('bcrypt');
    await exports.contributorCollection.deleteMany({});
    await exports.contributorCollection.insertMany([
        {
            name: 'alve0031',
            hashedPassword: bcrypt.hashSync('azerty', 2)
        },
        {
            name: 'mato0009',
            hashedPassword: bcrypt.hashSync('qsdfgh', 2)
        }
    ]);
}
exports.seedContributors = seedContributors;
class ContributorSchema {
    static async showInvalidDocuments() {
        console.log((await exports.contributorCollection.find({ $nor: [ContributorSchema.schema] }).toArray()).map((s) => [s.name]));
    }
    static async applyToCollection() {
        await mongo_1.mongodb.command({
            collMod: 'software',
            validator: ContributorSchema.schema
        });
    }
    static async dumpFromCollection() {
        const options = await exports.contributorCollection.options();
        console.log('softwareSchema :');
        console.dir(options.validator, { depth: null });
    }
    static async insertTestDocument(contributor) {
        try {
            await exports.contributorCollection.insertOne(contributor);
        }
        catch (err) {
            const error = err;
            console.log(error.message);
            console.dir(error.errInfo?.details, { depth: null });
        }
    }
}
exports.ContributorSchema = ContributorSchema;
ContributorSchema.schema = {
    $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'hashedPassword'],
        properties: {
            _id: {},
            id: {
                bsonType: 'number',
            },
            name: {
                bsonType: 'string',
                description: "'name' is required and is a string"
            },
            hashedPassword: {
                bsonType: 'string',
                description: "'hashedPassword' is required and is a string"
            },
        }
    }
};
