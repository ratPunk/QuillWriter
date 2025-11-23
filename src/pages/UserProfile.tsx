import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit } from "react-icons/fa";
import { LuLogOut, LuSettings } from "react-icons/lu";
import { FaCopy } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';

import Header from "../modules/Header";
import Modal from "../modules/Modal";
import { getUserFromCookies, saveUserToCookies, removeUserFromCookies } from "../utils/cookies";
import { updateUserProfile } from "../api/UpdateUser";
import type { User } from "../typescript/user";
import "../styles/css/pagesCss/userprofile.css";

function UserProfile() {
    // State
    const [user, setUser] = useState<User | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Hooks
    const navigate = useNavigate();

    // Effects
    useEffect(() => {
        setUser(getUserFromCookies());
    }, []);

    // Modal handlers
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Event handlers
    const handleLogout = () => {
        removeUserFromCookies();
        navigate('/');
    };

    const handleEditProfile = () => {
        openModal();
    };

    const handleCopy = async (value: string | undefined) => {
        try {
            if(value === undefined){

            }else if (!isCopied) {
                setIsCopied(true);
                await navigator.clipboard.writeText(value);
                toast('Ваш user id скопирован!');
                setTimeout(() => setIsCopied(false), 2000);
            }
        } catch (err) {
            console.error('Failed to copy: ', err);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleSaveProfile = async (updatedData: Partial<User>) => {
        try {
            if (!user) return;

            const result = await updateUserProfile(user.id, updatedData);
            saveUserToCookies(result.data);
            
            if (updatedData.username || updatedData.email || updatedData.user_id) {
                setUser(prev => prev ? { ...prev, ...updatedData } : null);
            }

            toast.success('Профиль успешно обновлен!');
        } catch (error: any) {
            console.error('Error updating profile:', error);

            if (error.message.includes('already taken')) {
                toast.error('Этот username/email/user_id уже занят');
            } else {
                toast.error('Ошибка при обновлении профиля');
            }
        }
    };

    // Helper functions
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Render conditions
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
                {/* User Card */}
                <div className="user-card">
                    <div className="card-header">
                        <div className="user-avatar">
                            <div className="avatar-icon">
                                <FaUser />
                            </div>
                        </div>
                        <div className="user-basic-info">
                            <h2>{user.username}</h2>
                            <p className="user-id">
                                {user.user_id} 
                                <FaCopy 
                                    size={20} 
                                    className="user-id-copy" 
                                    onClick={() => handleCopy(user.user_id)} 
                                />
                            </p>
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
                            <InfoItem 
                                icon={<FaUser />}
                                label="Имя пользователя"
                                value={user.username}
                            />
                            <InfoItem 
                                icon={<FaEnvelope />}
                                label="Email"
                                value={user.email}
                            />
                            <InfoItem 
                                icon={<FaCalendarAlt />}
                                label="Дата регистрации"
                                value={formatDate(user.createdAt)}
                            />
                        </div>
                    </div>

                    <div className="card-footer">
                        <div className="user-stats">
                            <StatItem number={0} label="Подписчиков" />
                            <StatItem number={0} label="Подписок" />
                            <StatItem number={0} label="Статей" />
                            <StatItem number={0} label="Закладки" />
                        </div>

                        <button className="logout-btn" onClick={handleLogout}>
                            <LuLogOut />
                            <span>Выйти</span>
                        </button>
                    </div>
                </div>

                {/* Profile Sections */}
                <div className="profile-sections">
                    <SectionCard 
                        title="Настройки аккаунта"
                        description="Управление настройками вашего профиля и предпочтениями"
                        buttonText="Управление"
                    />
                    <SectionCard 
                        title="Безопасность"
                        description="Измените пароль и настройки безопасности"
                        buttonText="Настройки"
                    />
                    <SectionCard 
                        title="Активность"
                        description="Просмотр истории действий и активности"
                        buttonText="Просмотр"
                    />
                </div>
            </div>

            {/* Modals */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Редактирование профиля"
                user={user}
                onSave={handleSaveProfile}
            />

            {/* Toast */}
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

// Sub-components for better organization
interface InfoItemProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
    <div className="info-item">
        <div className="info-icon">{icon}</div>
        <div className="info-content">
            <label>{label}</label>
            <span>{value}</span>
        </div>
    </div>
);

interface StatItemProps {
    number: number;
    label: string;
}

const StatItem = ({ number, label }: StatItemProps) => (
    <div className="stat-item">
        <span className="stat-number">{number}</span>
        <span className="stat-label">{label}</span>
    </div>
);

interface SectionCardProps {
    title: string;
    description: string;
    buttonText: string;
}

const SectionCard = ({ title, description, buttonText }: SectionCardProps) => (
    <div className="section-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <button className="section-btn">{buttonText}</button>
    </div>
);

export default UserProfile;