import { DeleteFilled, EditFilled, FileAddFilled } from "@ant-design/icons";
import { Button, Input, Modal, Select, Table, type TableColumnsType } from "antd";
import { Formik, type FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { useMessage } from "../../contexts/MessageContext";
import { getAllProductCategory, type ProductCategory } from "../../services/product-categories-service";
import { createProduct, deleteProductById, getAllProduct, updateProductById, type Product } from "../../services/products-service";
import DashboardPage from "../DashboardPage";
import productFormSchema from "./schema";

interface DataType extends Product {
    key: React.Key;
}

interface ProductUpdate { name: string, code: string, price: number, product_category_id?: number }


const ProductsPage = () => {
    const [products, setProducts] = useState<DataType[]>([]);
    const [productCategories, setProductCategories] = useState<ProductCategory[]>();
    const loading = useLoading();

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>();
    const { success, error } = useMessage();

    const updateFormikRef = useRef<FormikProps<ProductUpdate>>(null);

    useEffect(() => {
        getAllProductCategory().then((dt) => {
            setProductCategories(dt.data);
        })
    }, [])

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
                        updateFormikRef?.current?.resetForm({
                            values: {
                                name: record.name,
                                code: record.code,
                                price: record.price,
                                product_category_id: record.product_categories[0].id
                            }
                        });
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

    const deleteProduct = () => {
        deleteProductById(selectedProduct?.id ?? 0).then((dt) => {
            getProducts()
            setOpenModalDelete(false);
            success('product "' + dt.data?.name + '" has deleted');
        })
    }

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
                <Button onClick={() => setOpenModalCreate(true)} variant="filled" color="magenta" size="large">
                    <FileAddFilled color="magenta" /> create
                </Button>
            </div>
            <Table<DataType> columns={columns} dataSource={products} size="large" />
            <Modal
                open={openModalCreate}
                onCancel={() => setOpenModalCreate(false)}
                title="Add Product"
                footer={false}
            >
                <Formik<ProductUpdate>
                    validationSchema={productFormSchema}
                    initialValues={{
                        name: "",
                        code: "",
                        price: 0.00,
                        product_category_id: undefined
                    }}
                    onSubmit={(dt, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        loading.showLoading();
                        createProduct({
                            name: dt.name,
                            code: dt.code,
                            price: Number(dt.price),
                            product_category_id: Number(dt.product_category_id)
                        }).then(() => {
                            getProducts();
                            setSubmitting(false);
                            setOpenModalCreate(false);
                            loading.hideLoading();
                            resetForm();
                            success("success create product");
                        }).catch(() => {
                            loading.hideLoading();
                            error('failed to create product');
                        })

                    }}
                    innerRef={updateFormikRef}
                >
                    {({ resetForm, values, setFieldValue, handleSubmit, isSubmitting, touched, errors, isValid, getFieldProps }) => (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2"  >
                            <div>
                                <p className="text-left mb-2 text-black">name</p>
                                <Input size="large" type="text" placeholder="product name" {...getFieldProps("name")} />
                                {errors.name && touched.name ? <p className="text-red-400 text-xs italic mt-0.5">{errors.name}</p> : null}
                            </div>
                            <div>
                                <p className="text-left mb-2 text-black">code</p>
                                <Input size="large" type="text" placeholder="product code" {...getFieldProps("code")} />
                                {errors.code && touched.code ? <p className="text-red-400 text-xs italic mt-0.5">{errors.code}</p> : null}
                            </div>
                            <div>
                                <p className="text-left mb-2 text-black">price</p>
                                <Input size="large" type="number" placeholder="product price" {...getFieldProps("price")} />
                                {errors.price && touched.price ? <p className="text-red-400 text-xs italic mt-0.5">{errors.price}</p> : null}
                            </div>
                            <div >
                                <p className="text-left mb-2 text-black">product category</p>
                                <Select
                                    className="w-[100%]"
                                    size="large"
                                    placeholder={'Product Category'}
                                    defaultValue={null}
                                    value={values?.product_category_id}
                                    onChange={(dt) => setFieldValue('product_category_id', dt)}
                                    options={productCategories?.map((dt) => {
                                        return {
                                            value: dt.id,
                                            label: dt.name
                                        }
                                    })}
                                />
                                {errors.product_category_id && touched.product_category_id ? <p className="text-red-400 text-xs italic mt-0.5">{errors.product_category_id}</p> : null}
                            </div>
                            <div className="flex flex-row mt-10 justify-end gap-2 items-center">
                                <Button key="back" variant="text" color="magenta" size="middle" onClick={() => {
                                    resetForm()
                                    setOpenModalCreate(false)
                                }}>
                                    Cancel
                                </Button>
                                <Button
                                    htmlType="submit"
                                    disabled={!isValid}
                                    loading={isSubmitting}
                                    variant="outlined"
                                    color="magenta"
                                    size="middle">
                                    Create
                                </Button>
                            </div>
                        </form>)}
                </Formik>
            </Modal>
            <Modal
                open={openModalUpdate}
                onCancel={() => setOpenModalUpdate(false)}
                title={`Update product "${selectedProduct?.name}"`}
                footer={false}
            >
                <Formik<ProductUpdate>
                    validationSchema={productFormSchema}
                    initialValues={{
                        name: selectedProduct?.name ?? "",
                        code: selectedProduct?.code ?? "",
                        price: selectedProduct?.price ?? 0.00,
                        product_category_id: selectedProduct?.product_categories[0]?.id ?? 0
                    }}
                    onSubmit={(dt, { setSubmitting }) => {
                        setSubmitting(true);
                        updateProductById(selectedProduct?.id ?? 0, {
                            name: dt.name,
                            code: dt.code,
                            price: Number(dt.price),
                            product_category_id: Number(dt.product_category_id)
                        }).then(() => {
                            getProducts();
                            setSubmitting(false);
                            setOpenModalUpdate(false);
                            success("success update product");
                        }).catch(() => {
                            error('failed to update product');
                        })
                        // setTimeout(() => {

                        // }, 1000);

                    }}
                    innerRef={updateFormikRef}
                >
                    {({ values, setFieldValue, handleSubmit, isSubmitting, touched, errors, isValid, getFieldProps }) => (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-2"  >
                            <div>
                                <p className="text-left mb-2 text-black">name</p>
                                <Input size="large" type="name" placeholder="product name" {...getFieldProps("name")} />
                                {errors.name && touched.name ? <p className="text-red-400 text-xs italic mt-0.5">{errors.name}</p> : null}
                            </div>
                            <div>
                                <p className="text-left mb-2 text-black">code</p>
                                <Input size="large" type="code" placeholder="product code" {...getFieldProps("code")} />
                                {errors.code && touched.code ? <p className="text-red-400 text-xs italic mt-0.5">{errors.code}</p> : null}
                            </div>
                            <div>
                                <p className="text-left mb-2 text-black">price</p>
                                <Input size="large" type="price" placeholder="product price" {...getFieldProps("price")} />
                                {errors.price && touched.price ? <p className="text-red-400 text-xs italic mt-0.5">{errors.price}</p> : null}
                            </div>
                            <div >
                                <p className="text-left mb-2 text-black">product category</p>
                                <Select
                                    className="w-[100%]"
                                    size="large"
                                    defaultValue={0}
                                    value={values?.product_category_id}
                                    onChange={(dt) => setFieldValue('product_category_id', dt)}
                                    options={productCategories?.map((dt) => {
                                        return {
                                            value: dt.id,
                                            label: dt.name
                                        }
                                    })}
                                />
                                {errors.product_category_id && touched.product_category_id ? <p className="text-red-400 text-xs italic mt-0.5">{errors.product_category_id}</p> : null}
                            </div>
                            <div className="flex flex-row mt-10 justify-end gap-2 items-center">
                                <Button key="back" variant="text" color="magenta" size="middle" onClick={() => setOpenModalUpdate(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    htmlType="submit"
                                    disabled={!isValid}
                                    loading={isSubmitting}
                                    variant="outlined"
                                    color="magenta"
                                    size="middle">
                                    Update
                                </Button>
                            </div>
                        </form>)}
                </Formik>
            </Modal>
            <Modal
                open={openModalDelete}
                title={`Delete product "${selectedProduct?.name}"`}
                onOk={() => deleteProduct()}
                onCancel={() => setOpenModalDelete(false)}
                footer={[
                    <Button key="back" variant="text" color="magenta" size="middle" onClick={() => setOpenModalDelete(false)}>
                        Cancel
                    </Button>,
                    <Button key="submit" variant="outlined" color="magenta" size="middle" onClick={() => deleteProduct()}>
                        Delete
                    </Button>,
                ]}
            >
                <div className="pb-10">
                    <p>Are you sure want to {`delete product "${selectedProduct?.name}"`}</p>
                </div>
            </Modal>
        </DashboardPage >
    )
}

export default ProductsPage;