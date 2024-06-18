import axios from 'axios';

const API_BASE_URL = 'http://localhost:5146/swagger';

// Product API calls
export const getProducts = () => axios.get(`${API_BASE_URL}/api/Product`);
export const createProduct = (product) => axios.post(`${API_BASE_URL}/api/Product`, product);
export const getProductById = (id) => axios.get(`${API_BASE_URL}/api/Product/${id}`);
export const updateProduct = (id, product) => axios.put(`${API_BASE_URL}/api/Product/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_BASE_URL}/api/Product/${id}`);
export const getProductsPaginated = (page, pageSize) => axios.get(`${API_BASE_URL}/api/Product/paginated`);
export const searchProducts = (searchTerm) => axios.get(`${API_BASE_URL}/api/Product/search`);

// User API calls
export const registerUser = (user) => axios.post(`${API_BASE_URL}/api/User/register`, user);
export const loginUser = (user) => axios.post(`${API_BASE_URL}/api/User/login`, user);
export const getUsers = () => axios.get(`${API_BASE_URL}/api/User`);
export const getUserById = (id) => axios.get(`${API_BASE_URL}/api/User/${id}`);
export const updateUser = (id, user) => axios.put(`${API_BASE_URL}/api/User/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_BASE_URL}/api/User/${id}`);