// Library.tsx
import BriefBookCard from "../components/BriefBookCard";
import Header from "../modules/Header";
import SideBar from "../modules/SideBar";
import "../styles/css/pagesCss/library.css";
import { getBooks } from "../api/GetBooks";
import { useEffect, useState } from "react";
import type { Book } from "../typescript/book";
import type { Filters } from "../typescript/filters";
import { getGenres } from "../api/GetGenres";
import type { Genre } from "../typescript/genre";
import { useSearchParams } from "react-router-dom";

function Library() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [books, setBooks] = useState<Book[] | null>(null);
    const [genres, setGenres] = useState<Genre[] | null>(null);
    const [filters, setFilters] = useState<Filters>({
        search: searchParams.get('search') || '',
        selectedGenreIds: []
    });

    useEffect(() => {
        // Очищаем все параметры
        setSearchParams({});
    }, [setSearchParams]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData = await getBooks(filters);
                setBooks(booksData);
                console.log("booksData: ", booksData);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, [filters]);

    useEffect(() => {
        console.log("useEffect genresData: ");
        const fetchGenres = async () => {
            try {
                const genresData = await getGenres();
                const genresWithSelection = genresData.map(genre => ({
                    ...genre,
                    selected: false
                }));
                console.log("genresWithSelection: ", genresWithSelection);
                setGenres(genresWithSelection);
                console.log("genresData: ", genresData);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    const FChangeGenresSelected = (genreId: string) => {
        const newGenres = genres?.map((genre: Genre) =>
            genre._id === genreId ? { ...genre, selected: !genre.selected } : genre
        ) ?? null;
        setGenres(newGenres);

        // Обновляем фильтры
        const selectedIds = newGenres?.filter(genre => genre.selected).map(genre => genre._id) || [];
        FupdateFilters({ selectedGenreIds: selectedIds });
    };

    const FupdateFilters = (updates: Partial<Filters>): void => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...updates
        }));
    };

    const FclearFilters = () => {
        setFilters({
            search: '',
            selectedGenreIds: [],
            sortBy: undefined,
            sortOrder: undefined
        });
        // Сбрасываем selected у всех жанров
        const newGenres = genres?.map((genre: Genre) => ({
            ...genre,
            selected: false
        })) ?? null;
        setGenres(newGenres);
    };

    return (
        <div id={"Library"}>
            <Header />
            <div className={"library-container"}>
                <SideBar
                    genres={genres}
                    FChangeGenresSelected={FChangeGenresSelected}
                    FupdateFilters={FupdateFilters}
                    FclearFilters={FclearFilters}
                    searchValue={filters.search}
                    filters={filters} // Добавь эту строку
                />
                <div className="books-list">
                    {books?.map((book) => (
                        <BriefBookCard book={book} key={book._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Library;