import { Button, Modal } from "antd";
import { useMessage } from "../../../contexts/MessageContext";
import { deleteProductCategoryById, type ProductCategory } from "../../../services/product-categories-service";

const ModalDeleteProductCategory = ({ openModalDelete, setOpenModalDelete, selectedProductCategory, getProductCategories }: {
    openModalDelete: boolean,
    setOpenModalDelete: (val: boolean) => void,
    selectedProductCategory: ProductCategory | null | undefined,
    getProductCategories: () => void,

}) => {
    const { success } = useMessage();
    const deleteProductCategory = () => {
        deleteProductCategoryById(selectedProductCategory?.id ?? 0).then((dt) => {
            getProductCategories()
            setOpenModalDelete(false);
            success('product category"' + dt.data?.name + '" has deleted');
        })
    }
    return (
        <Modal
            open={openModalDelete}
            title={`Delete product category "${selectedProductCategory?.name}"`}
            onOk={() => deleteProductCategory()}
            onCancel={() => setOpenModalDelete(false)}
            footer={[
                <Button key="back" variant="text" color="magenta" size="middle" onClick={() => setOpenModalDelete(false)}>
                    Cancel
                </Button>,
                <Button key="submit" variant="outlined" color="magenta" size="middle" onClick={() => deleteProductCategory()}>
                    Delete
                </Button>,
            ]}
        >
            <div className="pb-10">
                <p>Are you sure want to {`delete product "${selectedProductCategory?.name}"`}</p>
            </div>
        </Modal>
    )
}

export default ModalDeleteProductCategory;