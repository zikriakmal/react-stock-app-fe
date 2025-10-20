import axios, { AxiosError } from "axios";

// Create an axios instance
export const api = axios.create({
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
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor (optional)
api.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => {
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

export interface PaginatedResponse<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface PaginateParamsRequest {
    page?: number;
    per_page?: number;
}