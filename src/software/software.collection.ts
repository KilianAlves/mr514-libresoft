import { mongodb } from "../services/mongo";

export const softwareCollection = mongodb.collection<Software>('software');