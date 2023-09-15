import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000' // Configures server/port location to which requests will be sent
})

export default axiosInstance