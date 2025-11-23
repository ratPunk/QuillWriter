import { useEffect, useState } from "react";
import Header from "../modules/Header";
import { getUserFromCookies, saveUserToCookies } from "../utils/cookies";
import type { User } from "../typescript/user";
import "../styles/css/pagesCss/userprofile.css";
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit } from "react-icons/fa";
import { LuLogOut, LuSettings } from "react-icons/lu";
import { removeUserFromCookies } from '../utils/cookies';
import { useNavigate } from "react-router-dom";
import { FaCopy } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';
import Modal from "../modules/Modal";
import { updateUserProfile } from "../api/UpdateUser";

function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        setUser(getUserFromCookies());
    }, []);

    const handleLogout = () => {
        removeUserFromCookies();
        console.log("Logout clicked");
        navigate('/');
    };

    const handleEditProfile = () => {
        // Добавьте логику редактирования профиля
        openModal();
        console.log("Edit profile clicked");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleCopy = async (value: string) => {
        try {
            if (!isCopied) {
                setIsCopied(true);
                console.log('text copyed');
                await navigator.clipboard.writeText(value);
                toast('Ваш user id скопирован!');
                setTimeout(() => setIsCopied(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    // В UserProfile компоненте
    const handleSaveProfile = async (updatedData: Partial<User>) => {
        try {
            if (!user) return;

            const result = await updateUserProfile(user.id, updatedData);

            // Обновляем локальное состояние
            saveUserToCookies(result.data);

            if (updatedData.username || updatedData.email || updatedData.user_id) {
                setUser(prev => prev ? { ...prev, ...updatedData } : null);
            }

            toast.success('Профиль успешно обновлен!');
        } catch (error: any) {
            console.error('Error updating profile:', error);

            // Показываем конкретную ошибку от сервера
            if (error.message.includes('already taken')) {
                toast.error('Этот username/email/user_id уже занят');
            } else {
                toast.error('Ошибка при обновлении профиля');
            }
        }
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
                {/* <div className="profile-header">
                    <h1>Профиль пользователя</h1>
                    <p>Управление вашей учетной записью</p>
                </div> */}

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
                            <p className="user-id">{user.user_id} <FaCopy size={20} className="user-id-copy" onClick={() => handleCopy(`${user.user_id}`)} /></p>
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

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Редактирование профиля"
                user={user}
                onSave={handleSaveProfile}
            />


            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 2000,
                    style: {
                        background: 'var(--dark-slate)',
                        color: 'var(--text-primary)',
                        border: '1px solid var(--accent-gold)',
                        borderRadius: '8px',
                    },
                    success: {
                        iconTheme: {
                            primary: 'var(--accent-gold)',
                            secondary: 'var(--dark-slate)',
                        },
                    },
                }}
            />
        </div>
    );
}

export default UserProfile;