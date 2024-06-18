import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5146/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Product API calls
export const getProducts = () => api.get('/Product');
export const createProduct = (product) => api.post('/Product', product);
export const getProductById = (id) => api.get(`/Product/${id}`);
export const updateProduct = (id, product) => api.put(`/Product/${id}`, product);
export const deleteProduct = (id) => api.delete(`/Product/${id}`);
export const getProductsPaginated = (page, pageSize) => api.get('/Product/paginated');
export const searchProducts = (searchTerm) => api.get(`/Product/search?query=${searchTerm}`);

// User API calls
export const registerUser = (user) => api.post('/User/register', user);
export const loginUser = (user) => api.post('/User/login', user);
export const getUsers = () => api.get('/User');
export const getUserById = (id) => api.get(`/User/${id}`);
export const updateUser = (id, user) => api.put(`/User/${id}`, user);
export const deleteUser = (id) => api.delete(`/User/${id}`);
