export interface Book {
    title: string;
    description: string;
    image: File;
    author: string;
    rating: number;
    price: string
    category: string;
    edition: string;
    pageNumber: string;
    alphabet: string;
    releaseDate: Date;
    youtubeLink: string;
    isbn: string
}
export enum BookEdition {
    Harcover = 0,
    Paperback = 1,
    eBook = 2,
    Audiobook = 3,
  }