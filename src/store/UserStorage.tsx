import { create } from 'zustand';

type userData = {
  role: string;
  access_token: string;
  email: string;
};

interface UserState {
  role: string;
  access_token: string;
  email: string;
  getAccessToken: () => string;
  getEmail: () => string;
  setUserData: (data: userData) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useUserStore = create<UserState>((set, get) => ({
  role: '',
  access_token: '',
  email: '',

  getAccessToken: () => {
    const state = get();
    return state.access_token;
  },

  getEmail: () => {
    const state = get();
    return state.email;
  },

  setUserData: (data) => {
    set({
      role: data.role,
      access_token: data.access_token,
      email: data.email,
    });
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('email', data.email);
  },

  logout: () => {
    set({ role: '', access_token: '', email: '' });
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
  },

  isAdmin: () => {
    const state = get();
    return state.role === 'admin';
  },
}));
