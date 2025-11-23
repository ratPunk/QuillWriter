// components/Modal.tsx
import { useEffect, useState } from "react";
import "../styles/css/modulesCss/modal.css";
import { FaWindowClose } from "react-icons/fa";
import type { User } from "../typescript/user";
import { useRef } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    user: User;
    onSave: (updatedData: Partial<User>) => void;
}

function Modal({ isOpen, onClose, title = "Редактирование профиля", user, onSave }: ModalProps) {
    const inputUsernameRef = useRef<HTMLInputElement>(null);
    const inputEmailRef = useRef<HTMLInputElement>(null);
    const inputUserIdRef = useRef<HTMLInputElement>(null);

    const [updatesData, setUpdatesData] = useState<Partial<User>>({});
    const [hasChanges, setHasChanges] = useState(false);

    // Сбрасываем состояние при открытии/закрытии модалки
    useEffect(() => {
        if (isOpen) {
            setUpdatesData({});
            setHasChanges(false);
        }
    }, [isOpen]);

    // Закрытие по ESC
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Закрытие по клику на оверлей
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    const handleInputUsernameChange = () => {
        const newUsername = inputUsernameRef.current?.value || '';
        if (newUsername !== user.username) {
            setUpdatesData(prev => ({ ...prev, username: newUsername }));
            setHasChanges(true);
        } else {
            setUpdatesData(prev => {
                const { username, ...rest } = prev;
                return rest;
            });
            checkIfHasChanges();
        }
    };

    const handleInputEmailChange = () => {
        const newEmail = inputEmailRef.current?.value || '';
        if (newEmail !== user.email) {
            setUpdatesData(prev => ({ ...prev, email: newEmail }));
            setHasChanges(true);
        } else {
            setUpdatesData(prev => {
                const { email, ...rest } = prev;
                return rest;
            });
            checkIfHasChanges();
        }
    };

    const handleInputUserIdChange = () => {
        const newUserId = inputUserIdRef.current?.value || '';
        if (newUserId !== user.user_id) {
            // Проверяем формат user_id (должен начинаться с @)
            const formattedUserId = newUserId.startsWith('@') ? newUserId : `@${newUserId}`;
            setUpdatesData(prev => ({ ...prev, user_id: formattedUserId }));
            setHasChanges(true);
            
            // Автоматически обновляем значение в input
            if (inputUserIdRef.current) {
                inputUserIdRef.current.value = formattedUserId;
            }
        } else {
            setUpdatesData(prev => {
                const { user_id, ...rest } = prev;
                return rest;
            });
            checkIfHasChanges();
        }
    };

    const checkIfHasChanges = () => {
        const currentUsername = inputUsernameRef.current?.value || '';
        const currentEmail = inputEmailRef.current?.value || '';
        const currentUserId = inputUserIdRef.current?.value || '';
        
        const hasUsernameChanged = currentUsername !== user.username;
        const hasEmailChanged = currentEmail !== user.email;
        const hasUserIdChanged = currentUserId !== user.user_id;
        
        setHasChanges(hasUsernameChanged || hasEmailChanged || hasUserIdChanged);
    };

    const handleSave = () => {
        if (hasChanges && Object.keys(updatesData).length > 0) {
            onSave(updatesData);
            onClose();
        }
    };

    const handleCancel = () => {
        // Сбрасываем значения к исходным
        // if (inputUsernameRef.current) inputUsernameRef.current.value = user.username;
        // if (inputEmailRef.current) inputEmailRef.current.value = user.email;
        // if (inputUserIdRef.current) inputUserIdRef.current.value = user.user_id;
        
        setUpdatesData({});
        setHasChanges(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button 
                        className="modal-close-btn"
                        onClick={handleCancel}
                        aria-label="Закрыть модальное окно"
                    >
                        <FaWindowClose className="modal-close-icon"/>
                    </button>
                </div>
                
                <div className="modal-body">
                    <div className="user-data-form">
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя</label>
                            <input 
                                type="text" 
                                id="username"
                                className="input-form" 
                                onChange={handleInputUsernameChange} 
                                ref={inputUsernameRef} 
                                defaultValue={user.username}
                                placeholder="Введите имя пользователя"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                className="input-form" 
                                onChange={handleInputEmailChange} 
                                ref={inputEmailRef} 
                                defaultValue={user.email}
                                placeholder="Введите email"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="user_id">User ID</label>
                            <input 
                                type="text" 
                                id="user_id"
                                className="input-form" 
                                onChange={handleInputUserIdChange} 
                                ref={inputUserIdRef} 
                                defaultValue={user.user_id}
                                placeholder="@username"
                            />
                            <small className="input-hint">Должен начинаться с @</small>
                        </div>
                    </div>

                    {hasChanges && (
                        <div className="changes-notice">
                            <p>Есть несохраненные изменения</p>
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button 
                        className="modal-btn modal-btn-secondary"
                        onClick={handleCancel}
                    >
                        Отмена
                    </button>
                    <button 
                        className="modal-btn modal-btn-primary"
                        onClick={handleSave}
                        disabled={!hasChanges}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;