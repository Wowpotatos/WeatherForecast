// api.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/v1';

const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/register/', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/login/', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data);
    }
};

export function isAuthenticated() {
    const token = localStorage.getItem('access_token')
    return !!token
}