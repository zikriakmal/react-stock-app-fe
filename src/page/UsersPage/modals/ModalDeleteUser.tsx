import { Button, Modal } from "antd";
import { useMessage } from "../../../contexts/MessageContext";
import { deleteUserById, type User } from "../../../services/users-service";

const ModalDeleteUser = ({ openModalDelete, setOpenModalDelete, selectedUser, getUsers }: {
    openModalDelete: boolean,
    setOpenModalDelete: (val: boolean) => void,
    selectedUser: User | null | undefined,
    getUsers: () => void,

}) => {
    const { success } = useMessage();
    const deleteUser = () => {
        deleteUserById(selectedUser?.id ?? 0).then((dt) => {
            getUsers()
            setOpenModalDelete(false);
            success('user "' + dt.data?.name + '" has deleted');
        })
    }
    return (
        <Modal
            open={openModalDelete}
            title={`Delete user "${selectedUser?.name}"`}
            onOk={() => deleteUser()}
            onCancel={() => setOpenModalDelete(false)}
            footer={[
                <Button key="back" variant="text" color="magenta" size="middle" onClick={() => setOpenModalDelete(false)}>
                    Cancel
                </Button>,
                <Button key="submit" variant="outlined" color="magenta" size="middle" onClick={() => deleteUser()}>
                    Delete
                </Button>,
            ]}
        >
            <div className="pb-10">
                <p>Are you sure want to {`delete product "${selectedUser?.name}"`}</p>
            </div>
        </Modal>
    )
}

export default ModalDeleteUser;