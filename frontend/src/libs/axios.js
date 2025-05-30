import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL
console.log(url)

const axiosInstance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
})
export default axiosInstance;