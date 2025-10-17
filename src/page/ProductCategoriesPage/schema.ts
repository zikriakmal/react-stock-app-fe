import * as Yup from 'yup';

const productCategoryFormSchema = Yup.object({
    name: Yup.string().required('product category name is Required'),
})

export default productCategoryFormSchema;