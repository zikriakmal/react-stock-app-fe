import * as Yup from 'yup';

const loginFormSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format")
        .required('Email is Required'),
    password: Yup.string()
        .required('Password is Required'),
})

export default loginFormSchema;