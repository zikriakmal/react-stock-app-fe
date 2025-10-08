import axios from "axios";

// Create an axios instance
const api = axios.create({
    baseURL: "http://localhost:8000/api/", // replace with your base URL
    timeout: 10000, // request timeout (ms)
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request interceptor (optional)
api.interceptors.request.use(
    (config) => {
        // Example: attach token
        const token = localStorage.getItem("accessToken");
        console.log(token,"what is token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor (optional)
api.interceptors.response.use(
    (response) => response.data, // simplify response
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

// Usage examples
export const getData = (endpoint: string, params = {}) =>
    api.get(endpoint, { params });

export const postData = (endpoint: string, data: any) =>
    api.post(endpoint, data);

export const putData = (endpoint: string, data: any) =>
    api.put(endpoint, data);

export const deleteData = (endpoint: string) =>
    api.delete(endpoint);


export interface ApiType<T> {
    data: T,
    error: boolean
}