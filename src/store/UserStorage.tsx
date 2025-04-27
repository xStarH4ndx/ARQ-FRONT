import { create } from 'zustand';
import { client } from '../api/client';

type userData = {
  id: string;
  role: string;
  access_token: string;
  email: string;
};

interface UserState {
  id: string;
  role: string;
  access_token: string;
  email: string;
  getAccessToken: () => string;
  getEmail: () => string;
  getRole: () => string;
  getId: () => string;
  setId: (id: string) => void;
  setUserData: (data: userData) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useUserStore = create<UserState>((set, get) => ({
  id: '',
  role: '',
  access_token: '',
  email: '',

  getId: () => {
    const state = get();
    return state.id;
  },

  getAccessToken: () => {
    const state = get();
    return state.access_token;
  },

  getEmail: () => {
    const state = get();
    return state.email;
  },

  getRole: () => {
    const state = get();
    return state.role;
  },

  setId: (id) => {
    set({ id });
    localStorage.setItem('id', id);
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
    set({ role: '', access_token: '', email: '', id: '' });
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    client.clearStore();
  },

  isAdmin: () => {
    const state = get();
    return state.role === 'admin';
  },
}));
