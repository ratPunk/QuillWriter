// api/LoginUser.ts
interface LoginData {
    email: string;
    password: string;
}

// Авторизация пользователя
export const loginUser = async (loginData: LoginData) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ User logged in:', result.data);
            return result.data;
        } else {
            console.error('❌ Login failed:', result.message);
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('❌ Login error:', error);
        throw error;
    }
};