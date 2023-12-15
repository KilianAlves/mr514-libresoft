import { mongodb } from "../services/mongo";

export const softwareCollection = mongodb.collection<Software>('software');
export class SoftwareSchema {
    private static schema = {
        $jsonSchema: {
            bsonType: 'object',
            required: ['name'],
            properties: {
                _id: {},
                name: {
                    bsonType: 'string',
                    description: "'name' is required and is a string"
                },
                url:{ 
                    bsonType: 'string',
                },
                id: {
                    bsonType: 'int',
                minimum: 1},
                description: {},
                external_resources: [],
            }
        }
    };

    static async showInvalidDocuments(): Promise<void> {
        console.log((await softwareCollection.find({$nor : [ SoftwareSchema.schema ]}).toArray()).map((s) => [s.name, s.id]));
    }
}