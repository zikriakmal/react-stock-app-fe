import { Button, Input, Modal, Select } from "antd";
import { Formik } from "formik";
import { useLoading } from "../../../../contexts/LoadingContext";
import { useMessage } from "../../../../contexts/MessageContext";
import type { ProductCategory } from "../../../../services/product-categories-service";
import { createProduct } from "../../../../services/products-service";
import productFormSchema from "../schema";

interface ProductCreate {
    name: string,
    code: string,
    price: number,
    product_category_id?: number
}

const ModalCreateProduct = ({
    openModalCreate,
    setOpenModalCreate,
    getProducts,
    productCategories
}: {
    openModalCreate: boolean,
    setOpenModalCreate: (val: boolean) => void,
    getProducts: () => void,
    productCategories?: ProductCategory[]
}) => {
    const loading = useLoading();
    const { success, error } = useMessage();
    return (
        <Modal
            open={openModalCreate}
            onCancel={() => setOpenModalCreate(false)}
            title="Add Product"
            footer={false}
        >
            <Formik<ProductCreate>
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
    )
}

export default ModalCreateProduct;