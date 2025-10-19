import * as Yup from 'yup';

const loginFormSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format (e.g. admin@gmail.com)")
        .required('Email is Required'),
    password: Yup.string()
        .required('Password is Required'),
})

export default loginFormSchema;