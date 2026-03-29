import axios from 'axios'

// ==========================
// Api base Url
// ==========================

export  const axiosintance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})