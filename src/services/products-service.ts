import { deleteData, getData, postData, putData, type ApiType, type PaginatedResponse, type PaginateParamsRequest } from "./api";
import type { ProductCategory } from "./product-categories-service";


export interface Product {
    id: number,
    code: string,
    name: string,
    price: number,
    quantity: number,
    product_categories: ProductCategory[],
    created_at: Date,
    updated_at: Date,
}

export interface ProductRequest {
    name: string,
    code: string,
    price: number,
    product_category_id: number
}

const createProduct = async (payload: ProductRequest): Promise<ApiType<Product | null>> => {
    try {
        const data = await postData('products/', payload);
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

const getAllProduct = async (params?: PaginateParamsRequest): Promise<ApiType<PaginatedResponse<Product> | null>> => {
    try {
        const data = await getData('products', params);
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

const updateProductById = async (id: number, payload: ProductRequest): Promise<ApiType<Product | null>> => {
    try {
        const data = await putData('products/' + id, payload);
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

const deleteProductById = async (id: number): Promise<ApiType<Product | null>> => {
    try {
        const data = await deleteData('products/' + id);
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

export { createProduct, deleteProductById, getAllProduct, updateProductById };

