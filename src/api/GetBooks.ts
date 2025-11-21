// api/GetBooks.ts

import type {Book} from "../typescript/book";
import type { Filters } from "../typescript/filters";

interface ApiResponse {
    success: boolean;
    data: Book[] | Book;
    message?: string;
}

// Получение всех книг с фильтрами
export const getBooks = async (filters?: Filters): Promise<Book[]> => {
    try {
        // Создаем параметры URL
        const params = new URLSearchParams();
        
        if (filters?.search) {
            params.append('search', filters.search);
        }
        
        if (filters?.selectedGenreIds && filters.selectedGenreIds.length > 0) {
            filters.selectedGenreIds.forEach(id => {
                params.append('genres', id);
            });
        }

        // Добавляем параметры сортировки
        if (filters?.sortBy) {
            params.append('sortBy', filters.sortBy);
        }
        
        if (filters?.sortOrder) {
            params.append('sortOrder', filters.sortOrder);
        }

        const url = `http://localhost:5000/api/books${params.toString() ? `?${params.toString()}` : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        
        if (result.success) {
            console.log('✅ Books received:', result.data);
            return Array.isArray(result.data) ? result.data : [result.data];
        } else {
            throw new Error(result.message || 'Failed to get books');
        }
    } catch (error) {
        console.error('❌ Book get failed:', error);
        throw error;
    }
};

// Получение одной книги по ID
export const getBookById = async (id: string): Promise<Book | null> => { 
    try {
        const response = await fetch(`http://localhost:5000/api/books?id=${id}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            if (response.status === 404) return null;
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse = await response.json();
        
        if (result.success) {
            console.log('✅ Book received:', result.data);
            return Array.isArray(result.data) ? result.data[0] : result.data;
        } else {
            throw new Error(result.message || 'Failed to get book');
        }
    } catch (error) {
        console.error('❌ Book get failed:', error);
        throw error;
    }
};