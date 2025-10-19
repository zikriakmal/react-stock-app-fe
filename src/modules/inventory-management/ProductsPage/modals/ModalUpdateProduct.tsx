import { Button, Input, Modal, Select } from "antd";
import { Formik } from "formik";
import { useMessage } from "../../../../contexts/MessageContext";
import type { ProductCategory } from "../../../../services/product-categories-service";
import { updateProductById, type Product } from "../../../../services/products-service";
import productFormSchema from "../schema";


interface ProductUpdate {
    name: string,
    code: string,
    price: number,
    product_category_id?: number
}

const ModalUpdateProduct = ({ openModalUpdate, setOpenModalUpdate, selectedProduct, getProducts, productCategories }: {
    openModalUpdate: boolean,
    setOpenModalUpdate: (val: boolean) => void,
    selectedProduct: Product | null | undefined,
    getProducts: () => void,
    productCategories?: ProductCategory[]

}) => {
    const { success, error } = useMessage();

    return (
        <Modal
            open={openModalUpdate}
            onCancel={() => setOpenModalUpdate(false)}
            title={`Update product "${selectedProduct?.name}"`}
            footer={false}
        >
            <Formik<ProductUpdate>
                enableReinitialize={true}
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
    )
}

export default ModalUpdateProduct;