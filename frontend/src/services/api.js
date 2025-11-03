import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:8000' : '/api',
  timeout: 15000,
})

// Interceptor untuk error handling
api.interceptors.response.use(
  response => response,
  error => {
    const msg = error.response?.data?.detail || error.message
    useToast().error(`API Error: ${msg}`)
    return Promise.reject(error)
  }
)

export default api