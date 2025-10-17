import { Button, Input, Modal } from "antd";
import { Formik } from "formik";
import { useMessage } from "../../../contexts/MessageContext";
import { updateUserById, type User } from "../../../services/users-service";
import userFormSchema from "../schema";


interface UserUpdate {
    name: string,
    email: string,
    password: string,
}

const ModalUserProduct = ({ openModalUpdate, setOpenModalUpdate, selectedUser, getUsers }: {
    openModalUpdate: boolean,
    setOpenModalUpdate: (val: boolean) => void,
    selectedUser: User | null | undefined,
    getUsers: () => void,
}) => {
    const { success, error } = useMessage();

    return (
        <Modal
            open={openModalUpdate}
            onCancel={() => setOpenModalUpdate(false)}
            title={`Update product "${selectedUser?.name}"`}
            footer={false}
        >
            <Formik<UserUpdate>
                validationSchema={userFormSchema}
                enableReinitialize={true}
                initialValues={{
                    name: selectedUser?.name ?? "",
                    email: selectedUser?.email ?? "",
                    password: ''
                }}
                onSubmit={(dt, { setSubmitting }) => {
                    setSubmitting(true);
                    updateUserById(selectedUser?.id ?? 0, {
                        name: dt.name,
                        email: dt.email,
                        password: dt.password
                    }).then(() => {
                        getUsers();
                        setSubmitting(false);
                        setOpenModalUpdate(false);
                        success("success update user");
                    }).catch(() => {
                        error('failed to update user');
                    })
                }}
            >
                {({ handleSubmit, isSubmitting, touched, errors, isValid, getFieldProps }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2"  >
                        <div>
                            <p className="text-left mb-2 text-black">name</p>
                            <Input size="large" type="name" placeholder="name" {...getFieldProps("name")} />
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
                            <Button key="back" variant="text" color="magenta" size="middle" onClick={() => setOpenModalUpdate(false)}>
                                Cancel
                            </Button>
                            <Button
                                htmlType="submit"
                                disabled={!isValid}
                                loading={isSubmitting}
                                variant="outlined"
                                color="magenta"
                                size="middle">
                                Update
                            </Button>
                        </div>
                    </form>)}
            </Formik>
        </Modal>
    )
}

export default ModalUserProduct;