import { create } from "zustand";
import api from "../services/api";

const useAuthStore = create((set, get) => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: false,
    loading: true,

    login: async (email, password) => {
        set({ loading: true });
        try {
            const response = await api.post("/api/auth/login", { email, password });
            const { token, user } = response.data;
            
            localStorage.setItem("token", token);
            set({
                token,
                user,
                isAuthenticated: true,
                loading: false,
            });
            return { success: true };
        } catch (error) {
            set({ loading: false });
            const message = error.response?.data?.error || "Login failed";
            return { success: false, error: message };
        }
    },

    register: async (name, email, password) => {
        set({ loading: true });
        try {
            const response = await api.post("/api/auth/register", { name, email, password });
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            set({
                token,
                user,
                isAuthenticated: true,
                loading: false,
            });
            return { success: true };
        } catch (error) {
            set({ loading: false });
            const message = error.response?.data?.error || "Registration failed";
            return { success: false, error: message };
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({
            user: null,
            token: null,
            isAuthenticated: false,
            loading: false,
        });
    },

    initialize: async () => {
        const token = get().token;
        if (!token) {
            set({ loading: false, isAuthenticated: false });
            return;
        }

        try {
            const response = await api.get("/api/auth/me");
            set({
                user: response.data,
                isAuthenticated: true,
                loading: false,
            });
        } catch (error) {
            console.error("Token verification failed:", error);
            localStorage.removeItem("token");
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
            });
        }
    },
}));

export default useAuthStore;
