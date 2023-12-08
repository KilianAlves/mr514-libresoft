interface Software {
    id: Number;
    name: string;
    website: string;
    description: string;
    users: SoftwareUsers[];
}

interface SoftwareUsers {
    id: Number;
    name: string;
    url: string;
    type: 'Administration' | 'Association' | 'Company' | 'Person';
}