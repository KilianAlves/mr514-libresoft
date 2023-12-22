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
}

promise.then(() => process.exit());