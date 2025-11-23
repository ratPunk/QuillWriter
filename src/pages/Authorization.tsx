import { useEffect, useState } from "react";
import { registerUser } from "../api/RegisterUser";
import { loginUser } from "../api/LoginUser"; // Импортируй функцию авторизации
import "@styles/css/pagesCss/authorization.css";
import { useNavigate } from "react-router-dom";
import { getUserFromCookies, saveUserToCookies } from "../utils/cookies";
import type { User } from "../typescript/user";


function Authorization() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const user = getUserFromCookies();
        if (user === null) {

        } else {
            navigate('/profile')
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            if (isLogin) {
                // 🔐 ЛОГИКА АВТОРИЗАЦИИ
                console.log("Login data:", { email: formData.email, password: formData.password });

                const loginData = {
                    email: formData.email,
                    password: formData.password
                };

                const result = await loginUser(loginData);

                // console.log("✅ Login successful:", result);
                // alert("Вход выполнен успешно!");

                // Очищаем форму после успешного входа
                setFormData({
                    email: "",
                    password: "",
                    username: "",
                    confirmPassword: ""
                });

                // Здесь можно добавить:
                // - Сохранение пользователя в контекст/стейт
                // - Перенаправление на другую страницу
                // - Сохранение токена в localStorage
                navigate("/profile");
                console.log("result: ", result);
                saveUserToCookies(result);

            } else {
                // Логика регистрации
                if (formData.password !== formData.confirmPassword) {
                    // alert("Пароли не совпадают");
                    setLoading(false);
                    return;
                }

                const userData = {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                };

                const result = await registerUser(userData);

                console.log("✅ Registration successful:", result);
                // alert("Регистрация успешна!");

                // Очищаем форму после успешной регистрации
                setFormData({
                    email: "",
                    password: "",
                    username: "",
                    confirmPassword: ""
                });

                // Автоматически переключаем на вход после регистрации
                setIsLogin(true);
            }

        } catch (err) {
            console.error(`❌ ${isLogin ? 'Login' : 'Registration'} error:`, err);
            setError(err instanceof Error ? err.message : `Ошибка ${isLogin ? 'входа' : 'регистрации'}`);
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError(""); // Очищаем ошибку при переключении
        // Очистка формы при переключении
        setFormData({
            email: "",
            password: "",
            username: "",
            confirmPassword: ""
        });
    };

    return (
        <div id={"Authorization"}>
            <div className={"authorization-container"}>
                <div className="form-container">
                    {/* Заголовок */}
                    <div className="form-header">
                        <h1 className="form-title">
                            {isLogin ? "Вход в аккаунт" : "Создать аккаунт"}
                        </h1>
                        <p className="form-subtitle">
                            {isLogin ? "Войдите в свой аккаунт Quill" : "Присоединяйтесь к Quill сегодня"}
                        </p>
                    </div>

                    {/* Показываем ошибку */}
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {/* Форма */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLogin && (
                            <div className="input-group">
                                <label htmlFor="username" className="input-label">
                                    Имя пользователя
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Введите имя пользователя"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div className="input-group">
                            <label htmlFor="email" className="input-label">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="input-label">
                                Пароль
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Введите пароль"
                                required
                            />
                        </div>

                        {!isLogin && (
                            <div className="input-group">
                                <label htmlFor="confirmPassword" className="input-label">
                                    Подтвердите пароль
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    placeholder="Повторите пароль"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        {isLogin && (
                            <div className="form-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox-input" />
                                    <span className="checkbox-text">Запомнить меня</span>
                                </label>
                                <a href="#" className="forgot-link">Забыли пароль?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading} // Блокируем кнопку при загрузке
                        >
                            {loading ? "Загрузка..." : isLogin ? "Войти" : "Создать аккаунт"}
                        </button>
                    </form>

                    {/* Переключение режима */}
                    <div className="switch-mode">
                        <p className="switch-text">
                            {isLogin ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
                            <button type="button" onClick={switchMode} className="switch-btn">
                                {isLogin ? "Зарегистрироваться" : "Войти"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authorization;