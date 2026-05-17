import axios from 'axios';

const url = import.meta.env.VITE_API_URL ? 'http://localhost:5000/api/auth' : 'https://auth-backend-green.vercel.app/api/auth'

const api = axios.create({
    baseURL: url,
    withCredentials: true,
    headers = {
        "content-type": "application/json"
    }
})

export default api