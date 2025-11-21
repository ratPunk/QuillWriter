// utils/cookies.ts
import Cookies from 'js-cookie';
import type {User} from "../typescript/user";

// Сохранение пользователя в куки
export const saveUserToCookies = (user: User): void => {
  Cookies.set("userData", JSON.stringify(user), { 
    expires: 7, // срок жизни 7 дней
    path: '/',
    sameSite: 'strict'
  });
};

// Получение пользователя из куки
export const getUserFromCookies = (): User | null => {
  const userCookie = Cookies.get("userData");
  if (!userCookie) return null;
  
  try {
    return JSON.parse(userCookie);
  } catch (error) {
    console.error('Error parsing user cookie:', error);
    return null;
  }
};

// Удаление пользователя из куки (логаут)
export const removeUserFromCookies = (): void => {
  Cookies.remove("userData", { path: '/' });
};
