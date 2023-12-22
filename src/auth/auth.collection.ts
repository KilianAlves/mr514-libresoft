import { MongoServerError } from "mongodb";
import { mongodb } from "../services/mongo";
import { Contributor } from "./auth";

export const contributorCollection = mongodb.collection('contributors');
export async function seedContributors() {
    const bcrypt = require('bcrypt');
    await contributorCollection.deleteMany({});
    await contributorCollection.insertMany([
        {
            name: 'alve0031',
            hashedPassword: bcrypt.hashSync('azerty', 2)
        },
        {
            name: 'mato0009',
            hashedPassword: bcrypt.hashSync('qsdfgh', 2)
        }
    ])
}
export class ContributorSchema {
    private static schema = {
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

    static async showInvalidDocuments(): Promise<void> {
        console.log((await contributorCollection.find({$nor : [ ContributorSchema.schema ]}).toArray()).map((s) => [s.name]));
    }

    static async applyToCollection(): Promise<void> {
        await mongodb.command({
            collMod: 'software',
            validator: ContributorSchema.schema
        }); 
    }

    static async dumpFromCollection(): Promise<void> {
        const options = await contributorCollection.options();
        console.log('softwareSchema :');
        console.dir(options.validator, { depth: null });
    }

    static async insertTestDocument(contributor: Contributor): Promise<void> {
        try {
            await contributorCollection.insertOne(contributor);
        }
        catch(err) {
            const error = err as MongoServerError;
            console.log(error.message);
            console.dir(error.errInfo?.details, {depth: null});
        }
    }
}