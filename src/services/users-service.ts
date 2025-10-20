import { deleteData, getData, postData, putData, type ApiType, type PaginatedResponse, type PaginateParamsRequest } from "./api";
export interface User {
    id: number,
    name: string,
    email: string,
    email_verified_at: Date | null,
    created_at: Date,
    updated_at: Date,
}
const getAllUsers = async (params?: PaginateParamsRequest): Promise<ApiType<PaginatedResponse<User> | null>> => {
    try {
        const data = await getData('users', params);
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

const createUser = async (payload: {
    name: string,
    email: string,
    password: string
}): Promise<ApiType<User | null>> => {
    try {
        const data = await postData('users', payload);
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

const deleteUserById = async (id: number): Promise<ApiType<User | null>> => {
    try {
        const data = await deleteData('users/' + id);
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

const updateUserById = async (id: number, payload: {
    name: string,
    email: string,
    password: string
}): Promise<ApiType<User | null>> => {
    try {
        const data = await putData('users/' + id, payload);
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

export { createUser, deleteUserById, getAllUsers, getMyInfo, updateUserById };

