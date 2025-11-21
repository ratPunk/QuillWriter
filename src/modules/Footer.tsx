import { LuBook } from "react-icons/lu";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "@styles/css/modulesCss/footer.css";

function Footer() {
    return (
        <footer id={"Footer"}>
            <div className="footer-container">
                {/* Верхняя секция */}
                <div className="footer-top">
                    <div className="footer-brand">
                        <div className="logo">
                            <LuBook className="logo-icon" />
                            <span className="logo-text">Quill Writer</span>
                        </div>
                        <p className="brand-description">
                            Современная платформа для создания и управления контентом. 
                            Пишите, редактируйте и публикуйте с легкостью.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="GitHub" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="#" aria-label="Twitter" className="social-link">
                                <FaTwitter />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="social-link">
                                <FaLinkedin />
                            </a>
                            <a href="#" aria-label="Email" className="social-link">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>

                    <div className="footer-links">
                        {/* Колонка 1: Продукт */}
                        <div className="link-column">
                            <h4 className="column-title">Продукт</h4>
                            <ul className="link-list">
                                <li><a href="#" className="footer-link">Возможности</a></li>
                                <li><a href="#" className="footer-link">Тарифы</a></li>
                                <li><a href="#" className="footer-link">Документация</a></li>
                                <li><a href="#" className="footer-link">API</a></li>
                            </ul>
                        </div>

                        {/* Колонка 2: Поддержка */}
                        <div className="link-column">
                            <h4 className="column-title">Поддержка</h4>
                            <ul className="link-list">
                                <li><a href="#" className="footer-link">Помощь</a></li>
                                <li><a href="#" className="footer-link">Сообщество</a></li>
                                <li><a href="#" className="footer-link">Блог</a></li>
                                <li><a href="#" className="footer-link">Контакты</a></li>
                            </ul>
                        </div>

                        {/* Колонка 3: Компания */}
                        <div className="link-column">
                            <h4 className="column-title">Компания</h4>
                            <ul className="link-list">
                                <li><a href="/aboutus" className="footer-link">О нас</a></li>
                                <li><a href="#" className="footer-link">Карьера</a></li>
                                <li><a href="#" className="footer-link">Партнеры</a></li>
                                <li><a href="#" className="footer-link">Правовая информация</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Нижняя секция */}
                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <div className="copyright">
                            © 2024 Quill. Все права защищены.
                        </div>
                        <div className="legal-links">
                            <a href="#" className="legal-link">Конфиденциальность</a>
                            <a href="#" className="legal-link">Условия использования</a>
                            <a href="#" className="legal-link">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;