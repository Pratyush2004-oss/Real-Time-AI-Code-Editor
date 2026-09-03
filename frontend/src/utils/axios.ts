import axios from "axios";
import { BACKEND_API_URL } from "../constants";

export const axiosInstance = axios.create({
    baseURL: BACKEND_API_URL,
    withCredentials: true,
});