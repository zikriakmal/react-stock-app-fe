import { getData, type ApiType } from "./api";
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

const getMyInfo = async (): Promise<ApiType<User | null>> => {
    try {
        const data = await getData('users/my-info');
        return {
            data: data.data,
            error: false
        };
    }
    catch (e) {
        return {
            data: null,
            error: true
        };
    }
}

export { getAllUsers, getMyInfo };
