export interface Ad {
    id: number;
    title: string;
    description: string;
    content: string;
    lastModified: string;
    item: number;
    createdBy: Contributor;
    contributors: Contributor[];
    formats: Format[];
    enabled: boolean;
}

interface Format {
    id: number;
    width: number;
    height: number;
}
interface Contributor {
    id: number;
    firstName: string;
    lastName: string;
}