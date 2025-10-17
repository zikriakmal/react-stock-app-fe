import { deleteData, getData, postData, putData, type ApiType } from "./api";
export interface ProductCategory {
    id: number,
    name: string,
    created_at?: Date,
    updated_at?: Date
}

const getAllProductCategory = async (): Promise<ApiType<Array<ProductCategory>>> => {
    try {
        const data = await getData('product-categories');
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

const createProductCategory = async (payload: { name: string }): Promise<ApiType<ProductCategory | undefined>> => {
    try {
        const data = await postData('product-categories', payload);
        return {
            data: data.data,
            error: false
        };
    }
    catch (e) {
        return {
            data: undefined,
            error: true
        };
    }
}

const updateProductCategoryById = async (id: number, payload: { name: string }): Promise<ApiType<ProductCategory | undefined>> => {
    try {
        const data = await putData('product-categories/' + id, payload);
        return {
            data: data.data,
            error: false
        };
    }
    catch (e) {
        return {
            data: undefined,
            error: true
        };
    }
}

const deleteProductCategoryById = async (id: number): Promise<ApiType<ProductCategory | null>> => {
    try {
        const data = await deleteData('product-categories/' + id);
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

export { createProductCategory, deleteProductCategoryById, getAllProductCategory, updateProductCategoryById };
