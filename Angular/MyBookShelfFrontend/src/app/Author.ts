import { Book } from "./Book";

export interface Author {

    id: number
    name: string;
    biography: string;
    image?: string;
    isForeign: boolean;
    books?: Book[];
}