import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Axios default config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is logged in on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            console.log('🔍 Checking authentication...');
            const { data } = await axios.get('/auth/me');
            if (data.success) {
                setUser(data.user);
                console.log('✅ User authenticated:', data.user.email);
            }
        } catch (error) {
            console.log('❌ Not authenticated');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name, email, password) => {
        try {
            setError(null);
            console.log('📝 Signup attempt:', email);
            const { data } = await axios.post('/auth/signup', { name, email, password });
            if (data.success) {
                setUser(data.user);
                console.log('✅ Signup successful:', data.user.email);
                return { success: true };
            }
        } catch (error) {
            console.error('Signup error:', error.response?.data);
            setError(error.response?.data?.message || 'Signup failed');
            return { success: false, message: error.response?.data?.message };
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            console.log('🔐 Login attempt:', email);
            const { data } = await axios.post('/auth/login', { email, password });
            if (data.success) {
                setUser(data.user);
                console.log('✅ Login successful:', data.user.email);
                return { success: true };
            }
        } catch (error) {
            console.error('Login error:', error.response?.data);
            setError(error.response?.data?.message || 'Login failed');
            return { success: false, message: error.response?.data?.message };
        }
    };

    const logout = async () => {
        try {
            console.log('🚪 Logging out...');
            await axios.post('/auth/logout');
            setUser(null);
            console.log('✅ Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, signup, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};