import { Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers, type User } from "../../services/users-service";
import DashboardPage from "../DashboardPage";
import { useLoading } from "../../contexts/LoadingContext";

interface DataType extends User {
    key: React.Key;
}

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
];

const UsersPage = () => {
    const [users, setUsers] = useState<DataType[]>([]);
    const loading = useLoading();
    useEffect(() => {
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
    }, []);
    return (
        <DashboardPage>
            <Table<DataType> columns={columns} dataSource={users} size="large" />
        </DashboardPage>
    )
}

export default UsersPage;