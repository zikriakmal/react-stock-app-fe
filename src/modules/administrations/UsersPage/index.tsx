import { DeleteFilled, EditFilled, FileAddFilled } from "@ant-design/icons";
import { Button, Table, type TableColumnsType, type TablePaginationConfig } from "antd";
import React, { useEffect, useState } from "react";
import { useLoading } from "../../../contexts/LoadingContext";
import { getAllUsers, type User } from "../../../services/users-service";
import MainLayout from "../../../layouts/MainLayout";
import { ModalCreateUser, ModalDeleteUser, ModalUpdateUser } from "./modals";

interface DataType extends User {
    key: React.Key;
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<DataType[]>([]);
    const [pagination, setPagination] = useState<TablePaginationConfig>({
        current: 1,
        pageSize: 5,
        total: 0,
    });
    const [selectedUser, setSelectedUser] = useState<User>();
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const loading = useLoading();

    const columns: TableColumnsType<DataType> = [
        { title: "ID", dataIndex: "id" },
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        {
            title: "Verified At",
            dataIndex: "email_verified_at",
            render: (value) => (value ? new Date(value).toLocaleString() : "-"),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            width: 200,
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            title: "Updated At",
            dataIndex: "updated_at",
            width: 200,
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            title: "Action",
            dataIndex: "id",
            align: "center",
            width: 200,
            render: (_, record: User) => (
                <div className="flex flex-row gap-1 justify-center flex-wrap">
                    <Button
                        disabled={record.email === localStorage.getItem("email")}
                        onClick={() => {
                            setSelectedUser(record);
                            setOpenModalUpdate(true);
                        }}
                    >
                        <EditFilled />
                    </Button>
                    <Button
                        disabled={record.email === localStorage.getItem("email")}
                        onClick={() => {
                            setSelectedUser(record);
                            setOpenModalDelete(true);
                        }}
                    >
                        <DeleteFilled />
                    </Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        getUsers(pagination.current!, pagination.pageSize!);
    }, []);

    const getUsers = async (page = 1, perPage = 10) => {
        loading.showLoading();
        try {
            const res = await getAllUsers({ page, per_page: perPage });
            const paginatedData = res.data; // response from Laravel paginate()
            if (paginatedData) {
                setUsers(
                    paginatedData.data.map((dt: User) => ({
                        key: dt.id.toString(),
                        ...dt,
                    }))
                );
                setPagination({
                    current: paginatedData.current_page,
                    pageSize: paginatedData.per_page,
                    total: paginatedData.total,
                });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => loading.hideLoading(), 300);
        }
    };

    const handleTableChange = (newPagination: TablePaginationConfig) => {
        getUsers(newPagination.current!, newPagination.pageSize!);
    };

    return (
        <MainLayout>
            <div className="pb-2">
                <Button onClick={() => setOpenModalCreate(true)} size="middle">
                    <FileAddFilled /> Add Users
                </Button>
            </div>

            <Table<DataType>
                columns={columns}
                dataSource={users}
                pagination={pagination}
                onChange={handleTableChange}
                size="large"
                rowKey="id"
            />

            <ModalCreateUser
                getUsers={() => getUsers(pagination.current!, pagination.pageSize!)}
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
            />
            <ModalUpdateUser
                getUsers={() => getUsers(pagination.current!, pagination.pageSize!)}
                openModalUpdate={openModalUpdate}
                selectedUser={selectedUser}
                setOpenModalUpdate={setOpenModalUpdate}
            />
            <ModalDeleteUser
                getUsers={() => getUsers(pagination.current!, pagination.pageSize!)}
                selectedUser={selectedUser}
                openModalDelete={openModalDelete}
                setOpenModalDelete={setOpenModalDelete}
            />
        </MainLayout>
    );
};

export default UsersPage;
