import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const taskService = {
  getAllTasks: () => api.get(''),

  getTaskById: (id) => api.get(`/${id}`),

  createTask: (task) => api.post('', task),

  updateTask: (id, task) => api.put(`/${id}`, task),

  updateStatus: (id, status) => api.patch(`/${id}/status`, { status }),

  deleteTask: (id) => api.delete(`/${id}`),

  searchAndFilter: (params) => api.get('/search', { params }),

  getDashboardStats: () => api.get('/dashboard'),
};

export default taskService;