import { FileAddFilled } from "@ant-design/icons";
import { Button, Table, type TableColumnsType, type TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import { useLoading } from "../../../contexts/LoadingContext";
import MainLayout from "../../../layouts/MainLayout";
import { getAllProduct, type Product } from "../../../services/products-service";
import { getAllStockTransactions, type StockTransaction } from "../../../services/stock-service";
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
            title: 'Updated At',
            dataIndex: 'updated_at',
            width: 200,
            render: (value) => new Date(value).toLocaleString(),
        },
    ];


    const [stockTransactions, setStockTransactions] = useState<DataType[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total: 0,
    });

    const loading = useLoading();

    useEffect(() => {
        getStockTransactions(pagination.current!, pagination.pageSize!);
        getProducts();
    }, []);

    const getStockTransactions = async (page = 1, perPage = 5) => {
        loading.showLoading()
        getAllStockTransactions({ page, per_page: perPage }).then((dt) => {
            const paginatedData = dt?.data;
            if (paginatedData) {
                setStockTransactions(
                    paginatedData.data.map((dt: StockTransaction) => ({
                        key: dt.id.toString(),
                        ...dt,
                    }))
                );
                setPagination({
                    current: paginatedData.current_page,
                    pageSize: paginatedData.per_page,
                    total: paginatedData.total,
                });
            }
        }).finally(() => {
            setTimeout(() => {
                loading.hideLoading();
            }, 500);
        });
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
        });
    };

    const handleTableChange = (newPagination: TablePaginationConfig) => {
        getStockTransactions(newPagination.current!, newPagination.pageSize!);
    };

    return (
        <MainLayout>
            <div className="pb-2">
                <Button onClick={() => setOpenModalCreate(true)} variant="filled" color="magenta" size="middle">
                    <FileAddFilled color="magenta" /> Create Transaction
                </Button>
            </div>
            <Table<DataType>
                columns={columns}
                dataSource={stockTransactions}
                pagination={pagination}
                onChange={handleTableChange}
                size="large"
                rowKey="id"
            />
            <ModalCreateStockTransaction
                products={products}
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
                getStockTransactions={getStockTransactions}
            />
        </MainLayout>
    )
}

export default StockTransactionsPage;