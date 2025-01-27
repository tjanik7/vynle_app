import axios from "axios"
import { serverLocation } from "./serverLocation"

const axiosInstance = axios.create({
    baseURL: serverLocation + '/api' // Configures server/port location to which requests will be sent
})

export default axiosInstance