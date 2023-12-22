import { mongodb } from "../services/mongo";

export const softwareCollection = mongodb.collection<Software>('software');
export class SoftwareSchema {
    private static schema = {
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

    static async showInvalidDocuments(): Promise<void> {
        console.log((await softwareCollection.find({$nor : [ SoftwareSchema.schema ]}).toArray()).map((s) => [s.name, s.id]));
    }
    static async applyToCollection(): Promise<void> {
        await mongodb.command({
            collMod: 'software',
            validator: SoftwareSchema.schema
        }); 
    }

    static async dumpFromCollection(): Promise<void> {
        const options = await softwareCollection.options();
        console.log('softwareSchema :');
        console.dir(options.validator, { depth: null });
    }

}