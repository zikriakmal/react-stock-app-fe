import * as Yup from 'yup';

const settingsSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format (e.g. admin@gmail.com)")
        .required("Email is required"),
    name: Yup.string().required("Name is required"),
    oldPassword: Yup.string(),
    newPassword: Yup.string().when("oldPassword", {
        is: (val: string) => val && val.length > 0,
        then: (schema) =>
            schema.required("New password is required when changing password"),
        otherwise: (schema) => schema.notRequired(),
    }),
})
export default settingsSchema;
