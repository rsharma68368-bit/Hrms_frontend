import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://hrms-backend-nqkp.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getEmployees = () => api.get('/employees')
export const createEmployee = (data) => api.post('/employees', data)
export const deleteEmployee = (id) => api.delete(`/employees/${id}`)

export const getAttendance = (params) => api.get('/attendance', { params })
export const markAttendance = (data) => api.post('/attendance', data)

export const getDashboardStats = () => api.get('/dashboard/stats')

export default api
