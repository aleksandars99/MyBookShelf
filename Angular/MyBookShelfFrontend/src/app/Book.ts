export interface Book {
    title: string;
    description: string;
    image: string;
    author: string;
    rating: number;
    price: string
    comments : string[];
    categories: string[];
    edition: BookEdition;
    pageNumber: string;
    alphabet: string;
    releaseDate: Date;
    youtubeLink: string;
    isbn: string
}
enum BookEdition {
    Harcover,
    Paperback,
    eBook,
    Audiobook,
}