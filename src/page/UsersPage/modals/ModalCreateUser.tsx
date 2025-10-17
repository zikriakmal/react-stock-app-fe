import { Button, Input, Modal } from "antd";
import { Formik } from "formik";
import { useLoading } from "../../../contexts/LoadingContext";
import { useMessage } from "../../../contexts/MessageContext";
import { createUser } from "../../../services/users-service";
import userFormSchema from "../schema";

interface UserCreate {
    name: string,
    email: string,
    password: string,
}

const ModalCreateUser = ({
    openModalCreate,
    setOpenModalCreate,
    getUsers,
}: {
    openModalCreate: boolean,
    setOpenModalCreate: (val: boolean) => void,
    getUsers: () => void,
}) => {
    const loading = useLoading();
    const { success, error } = useMessage();
    return (
        <Modal
            open={openModalCreate}
            onCancel={() => setOpenModalCreate(false)}
            title="Add User"
            footer={false}
        >
            <Formik<UserCreate>
                validationSchema={userFormSchema}
                initialValues={{
                    name: "",
                    email: "",
                    password: ''
                }}
                onSubmit={(dt, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    loading.showLoading();
                    createUser({
                        name: dt.name,
                        email: dt.email,
                        password: dt.password
                    }).then(() => {
                        getUsers();
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
                            <p className="text-left mb-2 text-black">name</p>
                            <Input size="large" type="text" placeholder="name" {...getFieldProps("name")} />
                            {errors.name && touched.name ? <p className="text-red-400 text-xs italic mt-0.5">{errors.name}</p> : null}
                        </div>
                        <div>
                            <p className="text-left mb-2 text-black">email</p>
                            <Input size="large" type="text" placeholder="email" {...getFieldProps("email")} />
                            {errors.email && touched.email ? <p className="text-red-400 text-xs italic mt-0.5">{errors.email}</p> : null}
                        </div>
                        <div>
                            <p className="text-left mb-2 text-black">password</p>
                            <Input size="large" type="password" placeholder="password" {...getFieldProps("password")} />
                            {errors.password && touched.password ? <p className="text-red-400 text-xs italic mt-0.5">{errors.password}</p> : null}
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

export default ModalCreateUser;