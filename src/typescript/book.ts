// typescript/book.ts
import type { Genre } from "./genre";

export interface Book {
    _id: string;  
    name: string;
    author: string;
    year: number;
    file_path: string;
    genres?: Genre[];
    average_rating?: number;
    ratings_count?: number;
}