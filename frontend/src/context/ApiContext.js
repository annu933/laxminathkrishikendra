import axios from "axios"
const { createContext } = require("react");

export const ApiContext = createContext();

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})