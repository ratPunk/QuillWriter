import "@styles/css/pagesCss/bookcard.css";
import { LuBook } from "react-icons/lu";
import { IoStar } from "react-icons/io5";
// @ts-ignore
import Button from "@components/Button.tsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import { getBooks } from "../api/GetBooks";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Book } from "../typescript/book";
import type { Genre } from "../typescript/genre";
import { FaBookReader } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoDownload } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";

function BookCard() {
    const [searchParams] = useSearchParams();
    const book_id = searchParams.get('book_id');
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                // Получаем все книги
                const books = await getBooks();
                // Находим книгу по ID - ИСПРАВЛЕНО
                const foundBook = books.find(b => b._id === book_id);
                setBook(foundBook || null);
            } catch (error) {
                console.error('Error fetching book:', error);
            } finally {
                setLoading(false);
            }
        };

        if (book_id) {
            fetchBook();
        } else {
            setLoading(false);
        }
    }, [book_id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) return <div>Загрузка...</div>;
    if (!book) return <div>Книга не найдена</div>;

    return (
        <div id="BookCard">
            <div className="main-card">
                <div className="image-container">
                    <LuBook size="25rem" color="var(--accent-gold)" />
                </div>

                <div className="main-book-data">
                    <div className="back-button">
                        <Button title={<FaArrowLeftLong />} onClick={handleBack} />
                    </div>

                    <div className="book-header">
                        <h1>{book.name}</h1>
                        <p className="author">— {book.author}</p>
                    </div>

                    <div className="book-meta">
                        <div className="genres-list">
                            {book.genres?.map((genre: Genre) => (
                                <span key={genre._id} className="genre-tag">{genre.name}</span>
                            ))}
                            {/* <span className="genre-tag">Классика</span> */}
                        </div>
                        <div className="rating">
                            <IoStar className="star-icon" />
                            <span>4.5</span>
                        </div>
                    </div>

                    <div className="book-description">
                        <p>
                            Замечательная книга "{book.name}" автора {book.author},
                            опубликованная в {book.year} году.
                        </p>
                    </div>

                    <div className="book-actions">
                        <Button classNameProps="btn-primary" title="Читать" icon={<FaBookReader />} />
                        <Button classNameProps="btn-primary" title="Скачать" icon={<IoDownload />} />
                        <Button classNameProps="btn-outline" title="В избранное" icon={<FaBookmark />} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookCard;