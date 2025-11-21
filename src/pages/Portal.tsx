import "@styles/css/pagesCss/portal.css";
// @ts-ignore
import Header from "@modules/Header.tsx";
import {
    FaFire,
    FaStar,
    FaBook,
    FaUsers,
    FaArrowRight
} from "react-icons/fa";
import Footer from "../modules/Footer";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Portal() {
    const navigate = useNavigate();
    const searchInputRef = useRef<HTMLInputElement>(null);
  

    return (
        <div id={"Portal"}>
            <Header />
            <div className={"portal-container"}>

                {/* Герой-секция с поиском и призывом к действию */}
                <section className={"hero-section"}>
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Откройте мир книг с <span className="brand-accent">Quill Writer</span>
                        </h1>
                        <p className="hero-subtitle">
                            Находите, читайте, обсуждайте. Ваша следующая любимая книга уже ждет вас.
                        </p>
                        <div className="search-container">
                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Найти книгу или автора..."
                                    className="search-input"
                                    ref={searchInputRef}
                                />
                            </div>
                            <button className="search-button"
                            onClick={() => navigate(`/library?search=${searchInputRef.current?.value}`)}
                            >
                                Найти
                            </button>
                        </div>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-number">50K+</span>
                                <span className="stat-label">Книг в каталоге</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">10K+</span>
                                <span className="stat-label">Активных читателей</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">5K+</span>
                                <span className="stat-label">Рецензий</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Популярные книги недели */}
                <section className={"popular-books-section"}>
                    <div className="section-header">
                        <FaFire className="section-icon" />
                        <h2 className="section-title">Популярные сейчас</h2>
                        <a href="/popular" className="see-all-link">
                            Все популярные <FaArrowRight />
                        </a>
                    </div>
                    <div className="books-grid">
                        {/* Здесь будут карточки книг */}
                        <div className="book-card">
                            <div className="book-cover"></div>
                            <div className="book-info">
                                <h3 className="book-title">Название книги</h3>
                                <p className="book-author">Автор книги</p>
                                <div className="book-rating">⭐ 4.5</div>
                            </div>
                        </div>
                        {/* Повторить 5-6 карточек */}
                    </div>
                </section>

                {/* Новинки */}
                <section className={"new-releases-section"}>
                    <div className="section-header">
                        <FaStar className="section-icon" />
                        <h2 className="section-title">Новинки</h2>
                        <a href="/new" className="see-all-link">
                            Все новинки <FaArrowRight />
                        </a>
                    </div>
                    <div className="books-carousel">
                        {/* Карусель с новыми книгами */}
                    </div>
                </section>

                {/* Рекомендации для вас */}
                <section className={"recommendations-section"}>
                    <div className="section-header">
                        <FaBook className="section-icon" />
                        <h2 className="section-title">Рекомендуем вам</h2>
                        <a href="/recommendations" className="see-all-link">
                            Больше рекомендаций <FaArrowRight />
                        </a>
                    </div>
                    <div className="recommendations-grid">
                        {/* Персонализированные рекомендации */}
                    </div>
                </section>

                

                {/* Активные читательские клубы */}
                <section className={"book-clubs-section"}>
                    <div className="section-header">
                        <FaUsers className="section-icon" />
                        <h2 className="section-title">Активные обсуждения</h2>
                        <a href="/clubs" className="see-all-link">
                            Все клубы <FaArrowRight />
                        </a>
                    </div>
                    <div className="clubs-grid">
                        {/* Карточки книжных клубов */}
                    </div>
                </section>

                {/* Блог/Статьи о книгах */}
                <section className={"blog-section"}>
                    <div className="section-header">
                        <h2 className="section-title">Книжный блог</h2>
                        <a href="/blog" className="see-all-link">
                            Все статьи <FaArrowRight />
                        </a>
                    </div>
                    <div className="blog-grid">
                        {/* Превью статей блога */}
                    </div>
                </section>

                {/* CTA секция */}
                <section className={"cta-section"}>
                    <div className="cta-content">
                        <h2 className="cta-title">Присоединяйтесь к сообществу читателей</h2>
                        <p className="cta-text">
                            Ведите читательский дневник, делитесь мнением и находите единомышленников
                        </p>
                        <div className="cta-buttons">
                            <button className="cta-button primary">Начать читать</button>
                            <a className="cta-button secondary" href="/aboutus">Узнать больше</a>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Portal;