import { Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { getAllProduct, type Product } from "../../services/products-service";
import DashboardPage from "../DashboardPage";
import type { ProductCategory } from "../../services/product-categories-service";

interface DataType extends Product {
    key: React.Key;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Code',
        dataIndex: 'code',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        align: 'right',
        render: (value: number) =>
            new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(value),
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        align: 'right'
    },
    {
        title: 'Product Category',
        dataIndex: 'product_categories',
        align:'center',
        render: (value: ProductCategory[]) => {
            return (
                <div className="flex flex-row items-center flex-wrap justify-center">
                    {value.map((dt) => {
                        return (
                            <p className="bg-amber-600 max-w-16 font-semibold rounded-sm text-[8px] text-white p-1">
                                {dt.name}
                            </p>)
                    })}
                </div>
            )
        }
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        align: 'center',
        width: 200,
        render: (value) => new Date(value).toLocaleString(),
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        align: 'center',
        width: 200,
        render: (value) => new Date(value).toLocaleString(),
    },
];

const ProductsPage = () => {
    const [products, setProducts] = useState<DataType[]>([]);
    const loading = useLoading();
    useEffect(() => {
        loading.showLoading();
        getAllProduct().then((dt) => {
            setProducts(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }));
        });
        setTimeout(() => {
            loading.hideLoading();
        }, 500);
    }, []);
    return (
        <DashboardPage>
            <Table<DataType> columns={columns} dataSource={products} size="large" />
        </DashboardPage>
    )
}

export default ProductsPage;