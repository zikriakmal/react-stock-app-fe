import * as Yup from 'yup';

const productFormSchema = Yup.object({
    name: Yup.string().required('product name is Required'),
    code: Yup.string().required('code is Required'),
    price: Yup.number().required('price is Required'),
    product_category_id: Yup.number().required('Product category id is required'),
})

export default productFormSchema;