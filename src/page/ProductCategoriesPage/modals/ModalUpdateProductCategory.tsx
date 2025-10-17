import { Button, Input, Modal } from "antd";
import { Formik } from "formik";
import { useMessage } from "../../../contexts/MessageContext";
import type { ProductCategory } from "../../../services/product-categories-service";
import { updateProductCategoryById } from "../../../services/product-categories-service";
import productFormSchema from "../schema";


interface ProductCategoryUpdate {
    name: string,
}

const ModalUpdateProductCategory = ({ openModalUpdate, setOpenModalUpdate, selectedProductCategory, getProductCategories }: {
    openModalUpdate: boolean,
    setOpenModalUpdate: (val: boolean) => void,
    selectedProductCategory: ProductCategory | null | undefined,
    getProductCategories: () => void,
}) => {
    const { success, error } = useMessage();

    return (
        <Modal
            open={openModalUpdate}
            onCancel={() => setOpenModalUpdate(false)}
            title={`Update product "${selectedProductCategory?.name}"`}
            footer={false}
        >
            <Formik<ProductCategoryUpdate>
                validationSchema={productFormSchema}
                initialValues={{
                    name: selectedProductCategory?.name ?? "",
                }}
                onSubmit={(dt, { setSubmitting }) => {
                    setSubmitting(true);
                    updateProductCategoryById(selectedProductCategory?.id ?? 0, {
                        name: dt.name,
                    }).then(() => {
                        getProductCategories();
                        setSubmitting(false);
                        setOpenModalUpdate(false);
                        success("success update product");
                    }).catch(() => {
                        error('failed to update product');
                    })
                }}
            >
                {({ handleSubmit, isSubmitting, touched, errors, isValid, getFieldProps }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2"  >
                        <div>
                            <p className="text-left mb-2 text-black">name</p>
                            <Input size="large" type="name" placeholder="product name" {...getFieldProps("name")} />
                            {errors.name && touched.name ? <p className="text-red-400 text-xs italic mt-0.5">{errors.name}</p> : null}
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

export default ModalUpdateProductCategory;