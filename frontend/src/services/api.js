import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// User API
export const userAPI = {
  register: (userData) => api.post('/user/register', userData),
  login: (credentials) => api.post('/user/login', credentials),
  logout: () => api.get('/user/logout'),
  getCurrentUser: () => api.get('/user/getUser'),
  getAllUsers: () => api.get('/user/getAllUser'),
  updateProfile: (formData) => api.put('/user/update', formData),
  deleteAccount: () => api.delete('/user/delete'),
  followUser: (followerId) => api.post(`/user/following/${followerId}`),
  likePost: (postId) => api.post(`/user/likePost/${postId}`),
};

// Post API
export const postAPI = {
  getAllPosts: () => api.get('/post/all'),
  createPost: (formData) => api.post('/post/create', formData),
  updatePost: (id, formData) => api.put(`/post/update/${id}`, formData),
  deletePost: (id) => api.delete(`/post/delete/${id}`),
  commentOnPost: (postId, comment) => api.post(`/post/comment/${postId}`, comment),
  likePost: (id) => api.put(`/post/like/${id}`),
};

export default api;
