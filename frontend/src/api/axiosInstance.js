import axios from "axios"
import { backendServerLocation } from "./serverLocations"

const axiosInstance = axios.create({
    baseURL: backendServerLocation + '/api' // Configures server/port location to which requests will be sent
})

export default axiosInstance