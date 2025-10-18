import { FileAddFilled } from "@ant-design/icons";
import { Button, Table, type TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { getAllProduct, type Product } from "../../services/products-service";
import { getAllStockTransactions, type StockTransaction } from "../../services/stock-service";
import DashboardPage from "../DashboardPage";
import { ModalCreateStockTransaction } from "./modals";

interface DataType extends StockTransaction {
    key: React.Key;
}

const StockTransactionsPage: React.FC<any> = () => {
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


    const [stockTransactions, setStockTransactions] = useState<DataType[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

    useEffect(() => {
        getStockTransactions();
        getProducts();
    }, []);

    const getStockTransactions = () => {
        getAllStockTransactions().then((dt) => {
            setStockTransactions(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }))
        })
    };

    const getProducts = () => {
        getAllProduct().then((dt) => {
            setProducts(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }))
        })
    };

    return (
        <DashboardPage>
            <div className="pb-2">
                <Button onClick={() => setOpenModalCreate(true)} variant="filled" color="magenta" size="middle">
                    <FileAddFilled color="magenta" /> Create Transaction
                </Button>
            </div>
            <Table<DataType> columns={columns} dataSource={stockTransactions} size="large" />
            <ModalCreateStockTransaction
                products={products}
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                getStockTransactions={getStockTransactions}
            />
        </DashboardPage>
    )
}

export default StockTransactionsPage;