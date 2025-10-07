import { getData } from "./api";

interface ApiType<T> {
    data: T,
    error: boolean
}

export interface User {
    id: number,
    name: string,
    email: string,
    email_verified_at: Date | null,
    created_at: Date,
    updated_at: Date,
}

const getAllUsers = async (): Promise<ApiType<Array<User>>> => {
    try {
        const data = await getData('users');
        return {
            data: data.data,
            error: false
        };
    }
    catch (e) {
        return {
            data: [],
            error: true
        };
    }
}

export { getAllUsers };
