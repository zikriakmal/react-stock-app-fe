import { Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import type { Product } from "../../services/products-service";
import { getAllStockTransactions, type StockTransaction } from "../../services/stock-service";
import DashboardPage from "../DashboardPage";

interface DataType extends StockTransaction {
    key: React.Key;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Product',
        dataIndex: 'product',
        render: (value: Product) => value.name
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity'
    },
    {
        title: 'Transaction type',
        dataIndex: 'transaction_type',
        align: 'center',
        render: (value: string) => <div className="flex-1 flex justify-center items-center">{(value === 'IN' ? <p className="text-xs w-18 bg-green-600 rounded-sm text-center text-white font-bold">IN</p> :
            <p className="text-xs w-18 bg-red-600 rounded-sm  text-center text-white font-bold">OUT</p>)}</div>
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        width: 200,
        render: (value) => new Date(value).toLocaleString(),
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        width: 200,
        render: (value) => new Date(value).toLocaleString(),
    },
];

const StocksPage = () => {
    const [stockTransactions, setStockTransactions] = useState<DataType[]>([]);
    useEffect(() => {
        getAllStockTransactions().then((dt) => {
            setStockTransactions(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }))
        })
    }, []);
    return (
        <DashboardPage>
            <Table<DataType> columns={columns} dataSource={stockTransactions} size="large" />
        </DashboardPage>
    )
}

export default StocksPage;