import { DeleteFilled, EditFilled, FileAddFilled } from "@ant-design/icons";
import { Button, Table, type TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { getAllProductCategory, type ProductCategory } from "../../services/product-categories-service";
import { getAllProduct, type Product } from "../../services/products-service";
import DashboardPage from "../DashboardPage";
import { ModalCreateProduct, ModalDeleteProduct, ModalUpdateProduct } from "./modals";

interface DataType extends Product {
    key: React.Key;
}
const ProductsPage: React.FC<any> = () => {
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
            align: 'center',
            render: (value: ProductCategory[]) => {
                return (
                    <div className="flex flex-row items-center flex-wrap justify-center">
                        {value.map((dt) => {
                            return (
                                <p key={dt.id} className="bg-amber-600 max-w-16 font-semibold rounded-sm text-[8px] text-white p-1">
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
        {
            title: 'Action',
            dataIndex: 'id',
            align: 'center',
            width: 200,
            render: (_, record: Product) =>
                <div className="flex flex-row gap-1 justify-center flex-wrap">
                    <Button onClick={() => {
                        setSelectedProduct(record);
                        setOpenModalUpdate(true)
                    }}>
                        <EditFilled />
                    </Button>
                    <Button onClick={() => {
                        setSelectedProduct(record);
                        setOpenModalDelete(true)
                    }}>
                        <DeleteFilled />
                    </Button>
                </div>
        },
    ];

    const loading = useLoading();
    const [products, setProducts] = useState<DataType[]>([]);
    const [productCategories, setProductCategories] = useState<ProductCategory[]>();

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>();

    const getProducts = async () => {
        getAllProduct().then((dt) => {
            setProducts(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }));
        });
    }

    useEffect(() => {
        getAllProductCategory().then((dt) => {
            setProductCategories(dt.data);
        })
    }, [])

    useEffect(() => {
        loading.showLoading();
        getProducts();
        setTimeout(() => {
            loading.hideLoading();
        }, 500);
    }, []);

    return (
        <DashboardPage>
            <div className="pb-2">
                <Button onClick={() => setOpenModalCreate(true)} variant="filled" color="magenta" size="middle">
                    <FileAddFilled color="magenta" /> Add Product
                </Button>
            </div>
            <Table<DataType> columns={columns} dataSource={products} size="large" />
            <ModalCreateProduct
                productCategories={productCategories}
                getProducts={getProducts}
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate} />
            <ModalUpdateProduct
                openModalUpdate={openModalUpdate}
                setOpenModalUpdate={setOpenModalUpdate}
                selectedProduct={selectedProduct}
                productCategories={productCategories}
                getProducts={getProducts}
            />
            <ModalDeleteProduct
                openModalDelete={openModalDelete}
                setOpenModalDelete={setOpenModalDelete}
                getProducts={getProducts}
                selectedProduct={selectedProduct} />
        </DashboardPage >
    )
}

export default ProductsPage;