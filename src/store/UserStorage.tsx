import { create } from 'zustand';

type userData = {
    role: string;
    access_token: string;
    email: string;
}

interface UserState {
    role: string;
    access_token: string;
    email: string;
    getAccessToken: () => string;
    getEmail: () => string;
    setUserData: (data:userData) => void;
    logout: () => void;
    isAdmin: () => boolean;
}

// Crear el store con Zustand
export const useUserStore = create<UserState>((set, get) => ({
    role: '',
    access_token: '',
    email: '',

    // Get access token
    getAccessToken: () => {
        const state = get(); // Get the current state
        return state.access_token; // Return the access_token
    },

    // Get email
    getEmail: () => {
        const state = get(); // Get the current state
        return state.email; // Return the email
    },

    // Set user data (role and token)
    setUserData: (data) => {
        set({
            role: data.role,
            access_token: data.access_token, // Storing access_token
            email: data.email
        });
        // Save token and role in localStorage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('email', data.email);
    },

    logout: () => {
        set({ role: '', access_token: '', email: '' }); // Clear the state
        localStorage.removeItem('access_token'); // Remove token
        localStorage.removeItem('role');  // Remove role
        localStorage.removeItem('email');  // Remove email
    },

    isAdmin: () => {
        const state = get(); // Get the current state
        return state.role === 'admin'; // Return true if the role is 'admin'
    }
}));
