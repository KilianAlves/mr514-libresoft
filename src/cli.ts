import { SoftwareSchema } from "./software/software.collection";

let cmd = 'show-invalid-documents';

if (process.argv.length > 2)
    cmd = process.argv[2];

let promise = null;

switch (cmd) {
    default:
        promise = SoftwareSchema.showInvalidDocuments();
        break;
    case 'apply-software-schema':
        promise = SoftwareSchema.applyToCollection().then(SoftwareSchema.dumpFromCollection);
        break;
    case 'validate-document':
            promise = SoftwareSchema.insertTestDocument({
                name: 'Libresoft',
                url: 'http://localhost:7000',
                id: 0,
                description: "TP MR514",
                external_resources: {
                    website: 'http://localhost:7000',
                },
                users: []
            });
            break;
}

promise.then(() => process.exit());