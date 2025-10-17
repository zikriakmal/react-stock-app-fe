import { HomeFilled, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, type MenuProps } from 'antd';
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router";


const DashboardPage: React.FC<any> = (props) => {
    const navigation = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigation('/login');
        }
    }, [])
    const items: MenuProps['items'] = [
        {
            label: (
                <div onClick={() => navigation('/settings')}>
                    <SettingOutlined /> User Settings
                </div>
            ),
            key: '1',
        },
        {
            label: (
                <div onClick={() => {
                    localStorage.removeItem('accessToken')
                    navigation('/login');
                }}
                >
                    <LogoutOutlined /> Logout
                </div>
            ),
            key: '2',
        },
    ];
    return (
        <div style={{ background: "url('/login-page.jpg') no-repeat" }} className='flex flex-row'>
            <div className='w-64 min-h-dvh border-r-[0.5px] border-r-gray-500 p-10'>
                <p onClick={() => navigation('/')} className='mb-10 text-center text-white text-2xl font-bold cursor-pointer'>STOCK APP</p>
                <div className='flex flex-col gap-10'>
                    <Link className={(location.pathname === '/stocks' ? 'bg-white drop-shadow-2x px-10 !text-black font-bold ' : "") + 'left-side-link hover:scale-105 transition'}
                        to={'/stocks'}>{'Transactions'}</Link>
                    <div className='w-full h-[0.2px] bg-white' />
                    <div className='flex flex-col gap-10'>
                        <p className='text-center text-white font-stretch-condensed'>{'MASTER DATA'}</p>
                        <Link className={(location.pathname === '/users' ? 'bg-white drop-shadow-2x px-10 !text-black font-bold ' : "") + 'left-side-link hover:scale-105 transition'}
                            to={'/users'}>Users</Link>
                        <Link className={(location.pathname === '/products' ? 'bg-white drop-shadow-2x px-10 !text-black font-bold ' : "") + 'left-side-link  hover:scale-105 transition'}
                            to={'/products'}>Products</Link>
                        <Link className={(location.pathname === '/product-categories' ? 'bg-white drop-shadow-2x px-10 !text-black font-bold ' : "") + 'left-side-link  hover:scale-105 transition'}
                            to={'/product-categories'}>Product Category</Link>
                    </div>
                </div>
            </div>
            <div className='bg-gray-50/60 backdrop-blur-sm flex-1 flex flex-col min-h-dvh'>
                <div className='flex flex-row justify-between bg-white/60  px-10 pt-0 pb-2.5     items-center'>
                    {location.pathname === '/' ?
                        <a className='!text-pink-600 font-semibold text-sm hover:-translate-y-1 transition p-2' href={'/'}><HomeFilled className='pr-1' /> Home</a> :
                        <Breadcrumb
                            items={
                                [
                                    {
                                        title: <a className='!text-pink-600 font-semibold text-sm p-2' href={'/'}><HomeFilled /></a>,
                                    },
                                    {
                                        title: <a className='!text-pink-600 font-semibold text-sm p-2' href={location.pathname}>{location.pathname.split('/')}</a>,
                                    }
                                ]
                            }
                        />
                    }

                    <div>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <div className='flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl hover:-translate-y-2 transition px-4  hover:shadow-sm'>
                                <p className='text-sm font-stretch-110%'>{localStorage.getItem('email')}</p>
                                <div className='h-12 w-12 items-center justify-center flex flex-col rounded-full bg-gray-100' onClick={(e) => e.preventDefault()}>
                                    <UserOutlined style={{ fontSize: 18 }} />
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </div>
                {/* content here */}
                <div className='flex flex-col flex-1 p-5 px-10'>
                    {props.children}
                </div>
            </div>
        </div >

    );
};

export default DashboardPage;