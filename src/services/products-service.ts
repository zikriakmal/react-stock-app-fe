import { getData, type ApiType } from "./api";
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

export { getAllProduct };
