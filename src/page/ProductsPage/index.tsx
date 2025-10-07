import { Table, type TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers, type User } from "../../services/users-service";
import DashboardPage from "../DashboardPage";

interface DataType extends User {
    key: React.Key;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'id',
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
        render: (value) => new Date(value).toLocaleString(),
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        render: (value) => new Date(value).toLocaleString(),
    },
];

const ProductsPage = () => {
    const [users, setUsers] = useState<DataType[]>([]);
    useEffect(() => {
        getAllUsers().then((dt) => {
            setUsers(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }))
        })
    }, []);
    return (
        <DashboardPage>
            <Table<DataType> columns={columns} dataSource={users} size="middle" />
        </DashboardPage>
    )
}

export default ProductsPage;