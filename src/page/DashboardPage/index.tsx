import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Divider, Dropdown, Table, type MenuProps, type TableColumnsType } from 'antd';
import React from 'react';
import { Link, useNavigate } from "react-router";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}


const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '8',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '11',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
];

const DashboardPage: React.FC = () => {
    const navigation = useNavigate();

    const items: MenuProps['items'] = [
        {
            label: (
                <div onClick={() => navigation('/dashboard')}>
                    <SettingOutlined /> Settings
                </div>
            ),
            key: '1',
        },
        {
            label: (
                <div onClick={() => navigation('/login')}>
                    <LogoutOutlined /> Logout
                </div>
            ),
            key: '2',
        },
    ];
    return (
        <div
            style={{ background: "url('/login-page.jpg') no-repeat" }}
            className='flex flex-row'>
            <div className='w-64 min-h-dvh border-r-[0.5px] border-r-gray-500 p-10'>
                <p className='mb-10 text-center text-white text-2xl font-bold'>STOCK APP</p>
                <div className='flex flex-col gap-10'>
                    <Link to={'/login'}>Stocks</Link>
                    <div className='w-full h-[0.2px] bg-white'></div>
                    <div className='flex flex-col gap-10'>
                        <p className='text-center text-white     font-stretch-condensed'>MASTER DATA</p>
                        <Link to={'/login'}>Users</Link>
                        <Link to={'/login'}>Product Category</Link>
                        <Link to={'/login'}>Products</Link>
                    </div>
                </div>
            </div>
            <div className='bg-gray-50 flex-1 flex flex-col min-h-dvh p-10'>
                <div className='flex flex-row justify-between'>
                    <Breadcrumb
                        items={[
                            {
                                title: 'Home',
                            },
                            {
                                title: <a href="">Users</a>,
                            }
                        ]}
                    />
                    <div>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <div className='flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl hover:-translate-y-2 transition px-4  hover:shadow-sm'>
                                <p>Admin Test</p>
                                <div className='h-12 w-12 items-center justify-center flex flex-col rounded-full bg-gray-100' onClick={(e) => e.preventDefault()}>
                                    <UserOutlined style={{ fontSize: 18 }} />
                                </div>
                            </div>
                        </Dropdown>

                    </div>
                </div>
                {/* content here */}
                <div className=' flex flex-col flex-1'>
                    <Divider>Users</Divider>
                    <Table<DataType>
                        columns={columns} dataSource={data} size="middle" />
                </div>
            </div>
        </div >

    );
};

export default DashboardPage;