import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL
const BASEURL = import.meta.env.MODE === 'development' ? url : "/api"
console.log(url)

const axiosInstance = axios.create({
    baseURL: BASEURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
})
export default axiosInstance;