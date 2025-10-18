import { DeleteFilled, EditFilled, FileAddFilled } from "@ant-design/icons";
import { Button, Table, type TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import { getAllUsers, type User } from "../../services/users-service";
import DashboardPage from "../DashboardPage";
import { ModalCreateUser, ModalDeleteUser, ModalUpdateUser } from "./modals";

interface DataType extends User {
    key: React.Key;
}


const UsersPage: React.FC<any> = () => {

    const columns: TableColumnsType<DataType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Verified At',
            dataIndex: 'email_verified_at',
            render: (value) => value ? new Date(value).toLocaleString() : '-',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            width: 200,
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            width: 200,
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            title: 'Action',
            dataIndex: 'id',
            align: 'center',
            width: 200,
            render: (_, record: User) =>
                <div className="flex flex-row gap-1 justify-center flex-wrap">
                    <Button disabled={record.email === localStorage.getItem('email')} onClick={() => {
                        setSelectedUser(record);
                        setOpenModalUpdate(true)
                    }}>
                        <EditFilled />
                    </Button>
                    <Button disabled={record.email === localStorage.getItem('email')} onClick={() => {
                        setSelectedUser(record);
                        setOpenModalDelete(true)
                    }}>
                        <DeleteFilled />
                    </Button>
                </div>
        },
    ];

    const [users, setUsers] = useState<DataType[]>([]);
    const [selectedUser, setSelectedUser] = useState<User>();

    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false);

    const loading = useLoading();
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        loading.showLoading();
        getAllUsers().then((dt) => {
            setUsers(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }));
            setTimeout(() => {
                loading.hideLoading();
            }, 500);
        })
    }

    return (
        <DashboardPage>
            <div className="pb-2">
                <Button onClick={() => setOpenModalCreate(true)} variant="filled" color="magenta" size="middle">
                    <FileAddFilled color="magenta" /> Add Users
                </Button>
            </div>
            <Table<DataType> columns={columns} dataSource={users} size="large" />
            <ModalCreateUser
                getUsers={getUsers}
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
            />
            <ModalUpdateUser
                getUsers={getUsers}
                openModalUpdate={openModalUpdate}
                selectedUser={selectedUser}
                setOpenModalUpdate={setOpenModalUpdate}
            />
            <ModalDeleteUser
                getUsers={getUsers}
                selectedUser={selectedUser}
                openModalDelete={openModalDelete}
                setOpenModalDelete={setOpenModalDelete}
            />
        </DashboardPage>
    )
}

export default UsersPage;