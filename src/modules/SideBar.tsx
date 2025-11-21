// SideBar.tsx
import "../styles/css/modulesCss/sidebar.css";
import { useEffect, useRef } from "react";
import type { Genre } from "../typescript/genre";
import type { Filters } from "../typescript/filters";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface SideBarProps {
    genres: Genre[] | null;
    FChangeGenresSelected: (value: string) => void;
    FupdateFilters: (value: Partial<Filters>) => void;
    FclearFilters: () => void;
    searchValue?: string;
    filters: Filters; // Добавь эту строку
}

function SideBar({ genres, FChangeGenresSelected, FupdateFilters, FclearFilters, searchValue, filters }: SideBarProps) {
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.value = searchValue || '';
        }
    }, [searchValue]);

    const handleChange = () => {
        if (searchInputRef.current) {
            FupdateFilters({ search: searchInputRef.current.value });
        }
    };

    const handleGenreChange = (genreId: string) => {
        FChangeGenresSelected(genreId);
    };

    const handleSortChange = (sortBy: string) => {
        FupdateFilters({ sortBy });
    };

    const handleSortOrderChange = () => {
        FupdateFilters({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' });
    };

    const handleResetFilters = () => {
        FclearFilters();
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
    }

    return (
        <div id="SideBar">
            <div className="search-container-sidebar">
                <input
                    type="search"
                    className="search-input"
                    placeholder="Поиск книг, авторов..."
                    onChange={handleChange}
                    ref={searchInputRef}
                />
            </div>

            <div className="filters-section">
                <h3>Сортировка</h3>
                <select 
                    className="filter-select"
                    onChange={(e) => handleSortChange(e.target.value)}
                    value={filters.sortBy || ''}
                >
                    <option value="">Без сортировки</option>
                    <option value="title">По названию</option>
                    <option value="author">По автору</option>
                    <option value="rating">По рейтингу</option>
                    <option value="publication-year">По году издания</option>
                </select>

                {filters.sortBy && (
                    <div className="sort-order-buttons">
                        <button
                            className={`sort-order-btn active`}
                            onClick={handleSortOrderChange}
                        >
                            <span className="sort-icon">
                                {filters.sortOrder === 'asc' ? <FaSortAmountUp/> :<FaSortAmountDown/>}
                            </span>
                            <span className="sort-order-text">
                                {filters.sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
                            </span>
                        </button>
                    </div>
                )}
            </div>

            <div className="select-category">
                <h3>Жанры</h3>
                {genres?.map((genre: Genre) => (
                    <button
                        key={genre._id}
                        className={`book-genre ${genre.selected ? 'active' : ''}`}
                        onClick={() => handleGenreChange(genre._id)}
                    >
                        {genre.name}
                    </button>
                ))}
            </div>

            <button className="reset-filters-btn" onClick={() => handleResetFilters()}>
                Сбросить фильтры
            </button>
        </div>
    );
}

export default SideBar;