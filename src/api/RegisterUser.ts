interface UserData {
    username: string;
    email: string;
    password: string;
  }

// Регистрация пользователя
export const registerUser = async (userData: UserData) => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ User registered:', result.data);
            return result.data;
        } else {
            console.error('❌ Registration failed:', result.message);
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('❌ Registration error:', error);
        throw error;
    }
};

