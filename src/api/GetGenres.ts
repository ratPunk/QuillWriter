// api/GetBooks.ts

import type {Genre} from "../typescript/genre";

interface ApiResponse {
    success: boolean;
    data: Genre[] | Genre;
    count: number;
    message?: string;
}

// Получение всех книг или поиск по строке
export const getGenres = async (): Promise<Genre[]> => {
    try {
        const url = 'http://localhost:5000/api/genres';

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
            console.log('✅ Genres received:', result.data);
            return Array.isArray(result.data) ? result.data : [result.data];
        } else {
            throw new Error(result.message || 'Failed to get genres');
        }
    } catch (error) {
        console.error('❌ Genre get failed:', error);
        throw error;
    }
};