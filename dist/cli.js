"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const software_collection_1 = require("./software/software.collection");
let cmd = 'show-invalid-documents';
if (process.argv.length > 2)
    cmd = process.argv[2];
let promise = null;
switch (cmd) {
    default:
        promise = software_collection_1.SoftwareSchema.showInvalidDocuments();
        break;
    case 'apply-software-schema':
        promise = software_collection_1.SoftwareSchema.applyToCollection().then(software_collection_1.SoftwareSchema.dumpFromCollection);
        break;
    case 'validate-document':
        promise = software_collection_1.SoftwareSchema.insertTestDocument({
            name: 'Libresoft',
            url: 'http://localhost:7000',
            id: 5,
            description: "TP MR514",
            external_resources: {
                website: 'http://localhost:7000',
            },
            users: []
        });
        break;
}
promise.then(() => process.exit());
