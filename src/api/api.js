import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'https://hrms-backend-nqkp.onrender.com/api'
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.message === 'Network Error' && !err.response) {
      const url = (err.config?.baseURL ?? baseURL) + (err.config?.url || '')
      err.userMessage = `Cannot reach the server. Make sure the backend is running (e.g. \`uvicorn app.main:app --reload --port 8000\` in the backend folder) and reachable at ${url}`
    }
    return Promise.reject(err)
  }
)

export const getEmployees = () => api.get('/employees')
export const createEmployee = (data) => api.post('/employees', data)
export const deleteEmployee = (id) => api.delete(`/employees/${id}`)

export const getAttendance = () => api.get('/attendance')
export const markAttendance = (data) => api.post('/attendance', data)

export const getDashboardStats = () => api.get('/dashboard/stats')

export default api
