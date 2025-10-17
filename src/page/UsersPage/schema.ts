import * as Yup from 'yup';

const userFormSchema = Yup.object({
    name: Yup.string().required('name is required'),
    email: Yup.string().email('wrong email format').required('email is required'),
    password: Yup.string().required('password is Required'),
})

export default userFormSchema;