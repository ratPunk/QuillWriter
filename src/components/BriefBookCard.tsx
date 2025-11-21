import "@styles/css/componentsCss/briefbookcard.css"
import { useNavigate } from "react-router-dom";
import { LuBook } from "react-icons/lu";
import { IoStar } from "react-icons/io5";
import { FaTags } from "react-icons/fa6";
// @ts-ignore
import Button from "@components/Button.tsx";
import type { Book } from "../typescript/book";
import type { Genre } from "../typescript/genre";
import { useState } from "react";

interface OfferCardProps {
    book: Book;
}

function BriefBookCard({ book }: OfferCardProps) {
    const navigate = useNavigate();
    const [showGenres, setShowGenres] = useState(false);

    const handleReadClick = () => {
        navigate(`/bookcard?book_id=${book._id}`);
    };

    return (
        <div className={"brief-book-card"}>
            <div className="image-container">
                <LuBook size="5rem" color="var(--accent-gold)" />
            </div>
            <div className="main-offer-card-content">
                <div className="header-offer-card-content">
                    <h3>{book.name}</h3>
                </div>
                <div className="body-offer-card-content">
                    <p>{book.author}</p>
                </div>
                <div className="footer-offer-card-content">
                    <div className="meta-info">
                        <div className="genres-container">
                            <div 
                                className="genres-trigger"
                                onMouseEnter={() => setShowGenres(true)}
                                onMouseLeave={() => setShowGenres(false)}
                            >
                                <FaTags className="genre-icon" />
                                <span className="genre-count">{book.genres?.length || 0}</span>
                                
                                {showGenres && book.genres && book.genres.length > 0 && (
                                    <div className="genres-tooltip">
                                        <div className="tooltip-content">
                                            <div className="genres-list-tooltip">
                                                {book.genres.map((genre: Genre) => (
                                                    <span key={genre._id} className="genre-tag">
                                                        {genre.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <span className="rating-book">
                            <span className="rating-value">
                                <IoStar size="1.2rem" />
                                {book.average_rating || 0}
                            </span>
                            <span>({book.ratings_count || 0})</span>
                        </span>
                    </div>
                    <Button
                        title={`Читать`}
                        classNameProps={"reed-book-button"}
                        onClick={handleReadClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default BriefBookCard;