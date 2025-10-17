import { DeleteFilled, EditFilled, FileAddFilled } from "@ant-design/icons";
import { Button, Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { getAllProductCategory, type ProductCategory } from "../../services/product-categories-service";
import DashboardPage from "../DashboardPage";
import ModalCreateProductCatgory from "./modals/ModalCreateProductCategory";
import ModalDeleteProductCategory from "./modals/ModalDeleteProductCategory";
import ModalUpdateProductCategory from "./modals/ModalUpdateProductCategory";

interface DataType extends ProductCategory {
    key: React.Key;
}


const ProductCategoriesPage = () => {
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
        {
            title: 'Action',
            dataIndex: 'id',
            align: 'center',
            width: 200,
            render: (_, record: ProductCategory) =>
                <div className="flex flex-row gap-1 justify-center flex-wrap">
                    <Button onClick={() => {
                        setSelectedProductCategory(record);
                        setOpenModalUpdate(true)
                    }}>
                        <EditFilled />
                    </Button>
                    <Button onClick={() => {
                        setSelectedProductCategory(record);
                        setOpenModalDelete(true)
                    }}>
                        <DeleteFilled />
                    </Button>
                </div>
        },
    ];

    const [productCategories, setProductCategories] = useState<DataType[]>([]);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);

    const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory | null>();

    const loading = useLoading();

    useEffect(() => {
        getProductCategories()
    }, []);

    const getProductCategories = () => {
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
    }

    return (
        <DashboardPage>
            <div className="pb-2">
                <Button onClick={() => setOpenModalCreate(true)} variant="filled" color="magenta" size="middle">
                    <FileAddFilled color="magenta" /> Add Product Category 
                </Button>
            </div>
            <Table<DataType> columns={columns} dataSource={productCategories} size="large" />
            <ModalCreateProductCatgory
                getProductCategories={getProductCategories}
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
            />
            <ModalUpdateProductCategory
                getProductCategories={getProductCategories}
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                selectedProductCategory={selectedProductCategory}
            />
            <ModalDeleteProductCategory
                getProductCategories={getProductCategories}
                openModalDelete={openModalDelete}
                setOpenModalDelete={setOpenModalDelete}
                selectedProductCategory={selectedProductCategory}
            />
        </DashboardPage>
    )
}

export default ProductCategoriesPage;