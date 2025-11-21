import { LuBook } from "react-icons/lu";
import { Link, NavLink, useLocation } from "react-router-dom";
import "@styles/css/modulesCss/header.css";
import { getUserFromCookies } from "../utils/cookies";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import type { User } from "../typescript/user";
import { RiQuillPenAiLine } from "react-icons/ri";

function Header() {
    const [userCookies, setUserCookies] = useState<User | null>(null);
    const location = useLocation();

    useEffect(() => {
        const user = getUserFromCookies();
        if (user != null) {
            setUserCookies(user);
        }
    }, []);

    // Функция для проверки активного пути
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div id={"Header"}>
            <div className={"header-container"}>
                <div className={"logo"}>
                    <RiQuillPenAiLine className="logo-icon"/>
                    {/* <LuBook className="logo-icon" /> */}
                    <span>Quill Writer</span>
                </div>
                <nav className={"header-nav"}>
                    <div className={"nav-list"}>
                        {/* Вариант 1: Использование NavLink с классом */}
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `link ${isActive ? 'active' : ''}`
                            }
                        >
                            Главная
                        </NavLink> |
                        
                        {/* Вариант 2: Использование обычного Link с условным классом */}
                        <Link 
                            to="/library" 
                            className={`link ${isActive('/library') ? 'active' : ''}`}
                        >
                            Библиотека
                        </Link> |
                        
                        <Link 
                            to="#" 
                            className={`link ${isActive('/my-books') ? 'active' : ''}`}
                        >
                            Мои книги
                        </Link> |
                    </div>
                    {userCookies != null ? (
                        <div className={"authorization-nav"}>
                            <Link 
                                to="/profile" 
                                className={`link ${isActive('/profile') ? 'active' : ''}`}
                            >
                                <FaUser/> {userCookies?.username}
                            </Link>
                        </div>
                    ) : (
                        <div className={"authorization-nav"}>
                            <Link 
                                to="/authorization" 
                                className={`link ${isActive('/authorization') ? 'active' : ''}`}
                            >
                                Вход/Регистрация
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
}

export default Header;