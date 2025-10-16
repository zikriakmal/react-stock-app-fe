import { deleteData, getData, postData, putData, type ApiType } from "./api";
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

const createProduct = async (payload: { name: string, code: string, price: number, product_category_id: number }): Promise<ApiType<Product | null>> => {
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

const getAllProduct = async (): Promise<ApiType<Array<Product>>> => {
    try {
        const data = await getData('products');
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

const updateProductById = async (id: number, payload: { name: string, code: string, price: number, product_category_id: number }): Promise<ApiType<Product | null>> => {
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

export { createProduct, getAllProduct, deleteProductById, updateProductById };
