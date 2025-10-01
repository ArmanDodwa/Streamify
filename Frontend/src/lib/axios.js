import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://localhost:808/api",
    withCredentials:true // send cookies with requset
})