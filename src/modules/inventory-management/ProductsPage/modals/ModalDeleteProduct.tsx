import { Button, Modal } from "antd";
import { useMessage } from "../../../../contexts/MessageContext";
import { deleteProductById, type Product } from "../../../../services/products-service";

const ModalDeleteProduct = ({ openModalDelete, setOpenModalDelete, selectedProduct, getProducts }: {
    openModalDelete: boolean,
    setOpenModalDelete: (val: boolean) => void,
    selectedProduct: Product | null | undefined,
    getProducts: () => void,

}) => {
    const { success } = useMessage();
    const deleteProduct = () => {
        deleteProductById(selectedProduct?.id ?? 0).then((dt) => {
            getProducts()
            setOpenModalDelete(false);
            success('product "' + dt.data?.name + '" has deleted');
        })
    }
    return (
        <Modal
            open={openModalDelete}
            title={`Delete product "${selectedProduct?.name}"`}
            onOk={() => deleteProduct()}
            onCancel={() => setOpenModalDelete(false)}
            footer={[
                <Button key="back" variant="text" color="magenta" size="middle" onClick={() => setOpenModalDelete(false)}>
                    Cancel
                </Button>,
                <Button key="submit" variant="outlined" color="magenta" size="middle" onClick={() => deleteProduct()}>
                    Delete
                </Button>,
            ]}
        >
            <div className="pb-10">
                <p>Are you sure want to {`delete product "${selectedProduct?.name}"`}</p>
            </div>
        </Modal>
    )
}

export default ModalDeleteProduct;