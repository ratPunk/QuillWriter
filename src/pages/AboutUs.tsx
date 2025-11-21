// AboutPage.tsx
import Header from "../modules/Header";
import "../styles/css/pagesCss/aboutus.css";
import { RiQuillPenLine, RiTeamLine, RiBookOpenLine, RiHeartLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { RiQuillPenAiLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
    const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number, duration: number, delay: number, rotation: number}>>([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Создаем 15 звезд со случайными параметрами
        const newStars = Array.from({ length: 35 }, (_, i) => ({
            id: i,
            x: Math.random() * 100, // позиция по X в %
            y: Math.random() * 100, // позиция по Y в %
            size: Math.random() * 1.5 + 0.5, // размер от 0.5rem до 2rem
            duration: Math.random() * 6 + 4, // длительность анимации от 4 до 10 секунд
            delay: Math.random() * 5, // задержка от 0 до 5 секунд
            rotation: Math.random() * 360 // начальный угол вращения
        }));
        setStars(newStars);
    }, []);

    return (
        <div id="AboutPage">
            <Header />
            <div className="about-container">
                {/* Hero Section */}
                <section className="about-hero">
                    {/* Анимированные звезды на заднем фоне */}
                    <div className="stars-container">
                        {stars.map(star => (
                            <div
                                key={star.id}
                                className="star"
                                style={{
                                    left: `${star.x}%`,
                                    top: `${star.y}%`,
                                    fontSize: `${star.size}rem`,
                                    animationDuration: `${star.duration}s`,
                                    animationDelay: `${star.delay}s`,
                                    transform: `rotate(${star.rotation}deg)`
                                }}
                            >
                                <FaRegStar />
                            </div>
                        ))}
                    </div>
                    
                    <div className="hero-content">
                        <div className="hero-icon-wrapper">
                            <RiQuillPenAiLine className="hero-icon" />
                        </div>
                        <h1 className="hero-title">Quill Writer</h1>
                        <p className="hero-subtitle">
                            Где каждая книга становится путешествием, а каждое слово — историей
                        </p>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="mission-section">
                    <div className="section-header">
                        <div className="header-decoration">
                            <div className="header-line"></div>
                            <h2>Наша философия</h2>
                            <div className="header-line"></div>
                        </div>
                    </div>
                    <div className="mission-content">
                        <p>
                            Quill Writer — это пространство, где литература встречается с сообществом. 
                            Мы верим, что каждая прочитанная книга меняет нас, а каждая написанная рецензия — 
                            вдохновляет других на новые открытия.
                        </p>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="features-section">
                    <div className="section-header">
                        <div className="header-decoration">
                            <div className="header-line"></div>
                            <h2>Возможности платформы</h2>
                            <div className="header-line"></div>
                        </div>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <RiBookOpenLine />
                            </div>
                            <div className="feature-content">
                                <h3>Личная библиотека</h3>
                                <p>Создавайте коллекции, отслеживайте прогресс и делитесь своими литературными находками</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <RiQuillPenLine />
                            </div>
                            <div className="feature-content">
                                <h3>Творчество</h3>
                                <p>Пишите рецензии, создавайте обзоры и выражайте свои мысли через письмо</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <RiTeamLine />
                            </div>
                            <div className="feature-content">
                                <h3>Сообщество</h3>
                                <p>Находите единомышленников, обсуждайте книги и открывайте новые литературные миры</p>
                            </div>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <RiHeartLine />
                            </div>
                            <div className="feature-content">
                                <h3>Открытия</h3>
                                <p>Персональные рекомендации и кураторские подборки от сообщества</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="values-section">
                    <div className="section-header">
                        <div className="header-decoration">
                            <div className="header-line"></div>
                            <h2>Наши принципы</h2>
                            <div className="header-line"></div>
                        </div>
                    </div>
                    <div className="values-grid">
                        <div className="value-card">
                            <h4>Глубина</h4>
                            <p>Ценим осмысленные обсуждения и вдумчивый анализ над поверхностными мнениями</p>
                        </div>
                        <div className="value-card">
                            <h4>Открытость</h4>
                            <p>Приветствуем разнообразие жанров, стилей и точек зрения в литературе</p>
                        </div>
                        <div className="value-card">
                            <h4>Поддержка</h4>
                            <p>Создаем среду, где каждый читатель и писатель может расти и развиваться</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Начните свое литературное путешествие</h2>
                        <p>
                            Присоединяйтесь к сообществу читателей и писателей, где каждая книга находит своего читателя, 
                            а каждая мысль — своего слушателя
                        </p>
                        <button className="cta-exploring" onClick={() => navigate('/authorization')}>
                            Присоединиться к сообществу
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AboutUs;