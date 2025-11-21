import { useEffect, useState } from "react";
import Header from "../modules/Header";
import { getUserFromCookies } from "../utils/cookies";
import type { User } from "../typescript/user";
import "../styles/css/pagesCss/userprofile.css";
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit } from "react-icons/fa";
import { LuLogOut, LuSettings } from "react-icons/lu";
import {removeUserFromCookies} from '../utils/cookies';
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    
useEffect(() => {
        setUser(getUserFromCookies());
    }, []);

    const handleLogout = () => {
        removeUserFromCookies()
        console.log("Logout clicked");
        navigate('/');
    };

    const handleEditProfile = () => {
        // Добавьте логику редактирования профиля
        navigate('/');
        console.log("Edit profile clicked");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!user) {
        return (
            <div id="UserProfile">
                <Header />
                <div className="user-not-found">
                    <div className="not-found-content">
                        <FaUser className="not-found-icon" />
                        <h2>Пользователь не найден</h2>
                        <p>Пожалуйста, войдите в систему</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="UserProfile">
            <Header />
            <div className="user-profile-container">
                <div className="profile-header">
                    <h1>Профиль пользователя</h1>
                    <p>Управление вашей учетной записью</p>
                </div>
                
                <div className="user-card">
                    <div className="card-header">
                        <div className="user-avatar">
                            <div className="avatar-icon">
                                <FaUser />
                            </div>
                            {/* <div className="avatar-status"></div> */}
                        </div>
                        <div className="user-basic-info">
                            <h2>{user.username}</h2>
                            <p className="user-role">Участник</p>
                        </div>
                        <div className="header-actions">
                            <button 
                                className="icon-btn edit-btn"
                                onClick={handleEditProfile}
                                title="Редактировать профиль"
                            >
                                <FaEdit />
                            </button>
                            <button 
                                className="icon-btn settings-btn"
                                title="Настройки"
                            >
                                <LuSettings />
                            </button>
                        </div>
                    </div>

                    <div className="card-body">
                        <div className="user-info-grid">
                            <div className="info-item">
                                <div className="info-icon">
                                    <FaUser />
                                </div>
                                <div className="info-content">
                                    <label>Имя пользователя</label>
                                    <span>{user.username}</span>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <FaEnvelope />
                                </div>
                                <div className="info-content">
                                    <label>Email</label>
                                    <span>{user.email}</span>
                                </div>
                            </div>
                            
                            <div className="info-item">
                                <div className="info-icon">
                                    <FaCalendarAlt />
                                </div>
                                <div className="info-content">
                                    <label>Дата регистрации</label>
                                    <span>{formatDate(user.createdAt)}</span>
                                </div>
                            </div>
                            
                            {/* <div className="info-item">
                                <div className="info-icon">
                                    <FaUser />
                                </div>
                                <div className="info-content">
                                    <label>ID пользователя</label>
                                    <span className="user-id">{user.id}</span>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="user-stats">
                            <div className="stat-item">
                                <span className="stat-number">0</span>
                                <span className="stat-label">Подписчиков</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">0</span>
                                <span className="stat-label">Подписок</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">0</span>
                                <span className="stat-label">Статей</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">0</span>
                                <span className="stat-label">Закладки</span>
                            </div>
                        </div>
                        
                        <button 
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            <LuLogOut />
                            <span>Выйти</span>
                        </button>
                    </div>
                </div>

                <div className="profile-sections">
                    <div className="section-card">
                        <h3>Настройки аккаунта</h3>
                        <p>Управление настройками вашего профиля и предпочтениями</p>
                        <button className="section-btn">Управление</button>
                    </div>
                    
                    <div className="section-card">
                        <h3>Безопасность</h3>
                        <p>Измените пароль и настройки безопасности</p>
                        <button className="section-btn">Настройки</button>
                    </div>
                    
                    <div className="section-card">
                        <h3>Активность</h3>
                        <p>Просмотр истории действий и активности</p>
                        <button className="section-btn">Просмотр</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;