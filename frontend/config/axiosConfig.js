import axios from "axios";

export const axiosInstance =  axios.create({
    baseURL: 'https://vahan-assignment-backend.vercel.app/api'
})