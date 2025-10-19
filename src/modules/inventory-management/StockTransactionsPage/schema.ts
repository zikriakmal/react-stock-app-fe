import * as Yup from 'yup';

const stockTransactionFormSchema = Yup.object({
    product_id: Yup.string().required('product id is Required'),
    transaction_type: Yup.string().required('transaction type is Required'),
    quantity: Yup.number().min(1, "quantity minimum 1").required('price is Required'),
    reference_no: Yup.string().required('reference number id is required'),
    notes: Yup.string().required('notes id is required'),
})

export default stockTransactionFormSchema;