import { getData, type ApiType } from "./api";
import type { Product } from "./products-service";

export interface StockTransaction {
    id: number;
    product_id: number;
    user_id: number;
    transaction_type: 'IN' | 'OUT'; // if it only can be these two
    quantity: number;
    reference_no: string;
    notes: string;
    transaction_date: string;
    created_at: string;
    updated_at: string;
    product: Product;
}

const getAllStockTransactions = async (): Promise<ApiType<Array<StockTransaction>>> => {
    try {
        const data = await getData('stock_transactions');
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


export { getAllStockTransactions }