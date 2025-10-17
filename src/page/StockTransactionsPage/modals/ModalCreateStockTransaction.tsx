import { Button, Input, Modal, Select } from "antd";
import { Formik } from "formik";
import { useLoading } from "../../../contexts/LoadingContext";
import { useMessage } from "../../../contexts/MessageContext";
import type { Product } from "../../../services/products-service";
import { createStockTransaction } from "../../../services/stock-service";
import stockTransactionFormSchema from "../schema";

interface StockTransactionCreate {
    product_id?: number,
    transaction_type: string,
    quantity: number,
    reference_no?: string,
    notes?: string,
}

const ModalCreateProduct = ({
    openModalCreate,
    setOpenModalCreate,
    getStockTransactions,
    products,
}: {
    openModalCreate: boolean,
    setOpenModalCreate: (val: boolean) => void,
    getStockTransactions: () => void,
    products: Product[],
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
            <Formik<StockTransactionCreate>
                validationSchema={stockTransactionFormSchema}
                initialValues={{
                    product_id: undefined,
                    transaction_type: "IN",
                    quantity: 0,
                    reference_no: "",
                    notes: "",
                }}
                onSubmit={(dt, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    loading.showLoading();
                    createStockTransaction({
                        product_id: dt.product_id ?? 0,
                        transaction_type: dt.transaction_type,
                        quantity: dt.quantity,
                        reference_no: dt.reference_no ?? "",
                        notes: dt.notes ?? "",
                    }).then(() => {
                        getStockTransactions();
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
                        <div >
                            <p className="text-left mb-2 text-black">Product</p>
                            <Select
                                showSearch
                                optionFilterProp="label"
                                className="w-[100%]"
                                size="large"
                                placeholder={'Product'}
                                defaultValue={null}
                                value={values?.product_id}
                                onChange={(dt) => setFieldValue('product_id', dt)}
                                options={products?.map((dt) => {
                                    return {
                                        value: dt.id,
                                        label: dt.name
                                    }
                                })}
                            />
                            {errors.product_id && touched.product_id ? <p className="text-red-400 text-xs italic mt-0.5">{errors.product_id}</p> : null}
                        </div>
                        <div>
                            <p className="text-left mb-2 text-black">Quantity</p>
                            <Input size="large" type="number" placeholder="Quantity" {...getFieldProps("quantity")} />
                            {errors.quantity && touched.quantity ? <p className="text-red-400 text-xs italic mt-0.5">{errors.quantity}</p> : null}
                        </div>
                        <div >
                            <p className="text-left mb-2 text-black">Transaction Type</p>
                            <Select
                                optionFilterProp="label"
                                className="w-[100%]"
                                size="large"
                                placeholder={'Transaction Type'}
                                defaultValue={null}
                                value={values?.transaction_type}
                                onChange={(dt) => setFieldValue('transaction_type', dt)}
                                options={[
                                    { value: 'IN', label: 'Product IN' },
                                    { value: 'OUT', label: 'Product OUT' }
                                ]}
                            />
                            {errors.product_id && touched.product_id ? <p className="text-red-400 text-xs italic mt-0.5">{errors.product_id}</p> : null}
                        </div>
                        <div>
                            <p className="text-left mb-2 text-black">Reference Number</p>
                            <Input size="large" type="text" placeholder="Reference number" {...getFieldProps("reference_no")} />
                            {errors.reference_no && touched.reference_no ? <p className="text-red-400 text-xs italic mt-0.5">{errors.reference_no}</p> : null}
                        </div>
                        <div>
                            <p className="text-left mb-2 text-black">Notes</p>
                            <Input size="large" type="text" placeholder="Notes" {...getFieldProps("notes")} />
                            {errors.notes && touched.notes ? <p className="text-red-400 text-xs italic mt-0.5">{errors.notes}</p> : null}
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