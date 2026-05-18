import axios from 'axios';

// Dynamic URL based on environment
const API_URL = import.meta.env.VITE_API_URL === 'development' 
    ? 'http://localhost:5000/api/auth' 
    : 'https://auth-backend-green.vercel.app/api/auth';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for debugging
api.interceptors.request.use(
    (config) => {
        console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('📤 Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log(`📥 API Response: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('📥 Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;