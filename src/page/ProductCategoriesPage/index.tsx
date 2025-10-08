import { Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { getAllProductCategory, type ProductCategory } from "../../services/product-categories-service";
import DashboardPage from "../DashboardPage";

interface DataType extends ProductCategory {
    key: React.Key;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
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

const ProductCategoriesPage = () => {
    const [productCategories, setProductCategories] = useState<DataType[]>([]);
    const loading = useLoading();
    useEffect(() => {
        loading.showLoading();
        getAllProductCategory().then((dt) => {
            setProductCategories(dt.data.map((dt) => {
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
            <Table<DataType> columns={columns} dataSource={productCategories} size="large" />
        </DashboardPage>
    )
}

export default ProductCategoriesPage;