import axios from "axios";

export function http() {
    const instance = axios.create({
        baseURL: process.env.REACT_APP_BASE_API_URL,
        timeout: 100000,
    });

    return instance;
}
