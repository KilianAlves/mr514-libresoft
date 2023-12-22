interface Software {
    id: Number;
    name: string;
    url: string;
    description: string;
    users: SoftwareUsers[];
    external_resources: Array;
}

interface SoftwareUsers {
    id: Number;
    name: string;
    url: string;
    type: 'Administration' | 'Association' | 'Company' | 'Person';
}