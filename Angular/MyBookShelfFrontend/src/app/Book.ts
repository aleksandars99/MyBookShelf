export interface Book {
    title: string;
    description: string;
    image: any;
    author: string;
    rating: number;
    price: string
    category: string;
    edition: number;
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