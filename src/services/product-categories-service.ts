import { getData, type ApiType } from "./api";

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

export { getAllProductCategory }