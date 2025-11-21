// typescript/filters.ts
export interface Filters {
    search?: string;
    selectedGenreIds?: string[];
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}