import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8001/api' // Configures server/port location to which requests will be sent
})

export default axiosInstance