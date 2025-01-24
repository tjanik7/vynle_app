import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://localhost:443/api' // Configures server/port location to which requests will be sent
})

export default axiosInstance