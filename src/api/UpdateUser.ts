// api/UpdateUser.ts
import type { User } from "../typescript/user";

interface UpdateUserResponse {
    success: boolean;
    message: string;
    data: User;
}

export const updateUserProfile = async (userId: string, updates: Partial<User>): Promise<UpdateUserResponse> => {
    try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: UpdateUserResponse = await response.json();
        
        if (result.success) {
            console.log('✅ User updated successfully:', result.data);
            return result;
        } else {
            throw new Error(result.message || 'Failed to update user');
        }
    } catch (error) {
        console.error('❌ User update failed:', error);
        throw error;
    }
};  