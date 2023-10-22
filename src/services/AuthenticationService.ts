import axios from 'axios'
import router from '../router'

export const serverAuthenticationApiEndpoint = `${import.meta.env.VITE_API_URL}/login`

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      router.replace({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export const AuthenticationServer = {
  login: async (params: { username: string; password: string }) => {
    try {
      const response = await axios.post(`${serverAuthenticationApiEndpoint}`, {
        username: params.username,
        password: params.password
      })

      return { authenticated: response.status === 204 }
    } catch (error: any) {
      console.error(`Error authenticating: ${error.error}`)
      return {
        authenticated: false
      }
    }
  }
}
