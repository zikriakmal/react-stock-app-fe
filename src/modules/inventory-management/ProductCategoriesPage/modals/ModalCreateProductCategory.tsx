import { Button, Input, Modal } from "antd";
import { Formik } from "formik";
import { useLoading } from "../../../../contexts/LoadingContext";
import { useMessage } from "../../../../contexts/MessageContext";
import { createProductCategory } from "../../../../services/product-categories-service";
import productCategoryFormSchema from "../schema";

interface ProductCatgoryCreate {
    name: string,
}

const ModalCreateProductCatgory = ({
    openModalCreate,
    setOpenModalCreate,
    getProductCategories,
}: {
    openModalCreate: boolean,
    setOpenModalCreate: (val: boolean) => void,
    getProductCategories: () => void,
}) => {
    const loading = useLoading();
    const { success, error } = useMessage();
    return (
        <Modal
            open={openModalCreate}
            onCancel={() => setOpenModalCreate(false)}
            title="Add Product Category"
            footer={false}
        >
            <Formik<ProductCatgoryCreate>
                validationSchema={productCategoryFormSchema}
                initialValues={{
                    name: "",
                }}
                onSubmit={(dt, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    loading.showLoading();
                    createProductCategory({
                        name: dt.name,
                    }).then(() => {
                        getProductCategories();
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
                {({ resetForm, handleSubmit, isSubmitting, touched, errors, isValid, getFieldProps }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2"  >
                        <div>
                            <p className="text-left mb-2 text-black">Name</p>
                            <Input size="large" type="text" placeholder="product category name" {...getFieldProps("name")} />
                            {errors.name && touched.name ? <p className="text-red-400 text-xs italic mt-0.5">{errors.name}</p> : null}
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

export default ModalCreateProductCatgory;