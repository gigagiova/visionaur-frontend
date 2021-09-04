import axios from 'axios'
import jwt_decode from 'jwt-decode'

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
})

export const axiosDataInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'multipart/form-data',
        'accept': 'application/json'
    }
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        // DO SOME MORE RESERCH

        if (!error.response) {
            console.log(error)
            // for some reasone we have no response, ie network error
            return Promise.reject(error)
        }

        // Prevent infinite loops
        if (error.response.status === 401 && originalRequest.url === axiosInstance.baseURL + 'token/refresh/') {
            window.location.href = '/force-logout/'
            return Promise.reject(error)
        }

        if (error.response.data.code === "token_not_valid" &&
            error.response.status === 401 && 
            error.response.statusText === "Unauthorized") 
            {
                const refreshToken = localStorage.getItem('refresh_token')

                if (refreshToken) {
                    const decodedToken = jwt_decode(refreshToken)

                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000)
                    
                    // if the token has not yet espired
                    if (decodedToken.exp > now) {
                        return axiosInstance
                        .post('/token/refresh/', {refresh: refreshToken})
                        .then((response) => {
                            
                            localStorage.setItem('access_token', response.data.access)
                            localStorage.setItem('refresh_token', response.data.refresh)
            
                            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access
                            originalRequest.headers['Authorization'] = "JWT " + response.data.access
                            
                            // we reiterate the fixed request
                            return axiosInstance(originalRequest)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    }else{
                        console.log("Refresh token is expired", decodedToken.exp, now)
                        window.location.href = '/force-logout/'
                    }
                }else{
                    console.log("Refresh token not available.")
                    window.location.href = '/force-logout/'
                }
        }
      
     
      // specific error handling done elsewhere
      if (error.response.status !== 500) window.location.href = '/force-logout/'
      return Promise.reject(error);
  }
)

export default axiosInstance