// hooks/useFavicon.js
import { useEffect } from 'react';

export const useFavicon = (iconUrl: string) => {
  useEffect(() => {
    // Явно указываем тип HTMLLinkElement
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
    
    // Теперь TypeScript знает, что link имеет свойства type, rel, href
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconUrl;
    
    document.getElementsByTagName('head')[0].appendChild(link);
  }, [iconUrl]);
};
// Использование в компоненте
//useFavicon('/favicon.ico');
  
