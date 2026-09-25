import axios from "axios";


const BACK_URL=import.meta.env.VITE_BACKEND_URL

export const pubApi= axios.create({
    baseURL:BACK_URL,
    withCredentials:true
})