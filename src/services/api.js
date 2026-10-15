import axios from 'axios'

// Sin VITE_API_URL el sitio funciona igual con los datos locales (src/data/modelos.json).
export const API_URL = import.meta.env.VITE_API_URL || ''

export const hayApi = Boolean(API_URL)

const api = axios.create({ baseURL: API_URL, timeout: 10000 })

const CLAVE_TOKEN = 'km_admin_token'

export const tokenAdmin = {
  leer: () => {
    try {
      return sessionStorage.getItem(CLAVE_TOKEN)
    } catch {
      return null
    }
  },
  guardar: (t) => {
    try {
      sessionStorage.setItem(CLAVE_TOKEN, t)
    } catch {
      /* sin storage: la sesion dura hasta recargar */
    }
  },
  borrar: () => {
    try {
      sessionStorage.removeItem(CLAVE_TOKEN)
    } catch {
      /* nada que borrar */
    }
  },
}

api.interceptors.request.use((config) => {
  const t = tokenAdmin.leer()
  if (t && config.url?.startsWith('/admin')) config.headers.Authorization = `Bearer ${t}`
  return config
})

api.interceptors.response.use(
  (r) => r,
  (error) => {
    // Token vencido o invalido en el panel: volver al login
    if (error.response?.status === 401 && error.config?.url?.startsWith('/admin') && !error.config.url.endsWith('/login')) {
      tokenAdmin.borrar()
      if (!window.location.pathname.startsWith('/admin/login')) window.location.assign('/admin/login')
    }
    return Promise.reject(error)
  },
)

export default api
