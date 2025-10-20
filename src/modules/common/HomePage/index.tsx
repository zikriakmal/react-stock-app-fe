import { UserOutlined } from "@ant-design/icons";
import { Avatar, List } from "antd";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { useLoading } from "../../../contexts/LoadingContext";
import MainLayout from "../../../layouts/MainLayout";
import { getAllProductCategory } from "../../../services/product-categories-service";
import { getAllProduct } from "../../../services/products-service";
import { getAllStockTransactions } from "../../../services/stock-service";
import { getAllUsers } from "../../../services/users-service";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage: React.FC<any> = () => {
    const [totalUsers, setTotalUsers] = useState<number>(0);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalProductCategories, setTotalProductCategories] = useState<number>(0);
    const [totalStockTransactions, setTotalStockTransactions] = useState<number>(0);

    const loading = useLoading();

    useEffect(() => {
        loading.showLoading();
        getAllUsers({ page: 1, per_page: 1 }).then((dt) => {
            if (dt.data) {
                setTotalUsers(dt.data.total);
            }
        });
        getAllProduct({ page: 1, per_page: 1 }).then((dt) => {
            if (dt.data) {
                setTotalProducts(dt.data.total);
            }
        });
        getAllProductCategory({ page: 1, per_page: 1 }).then((dt) => {
            if (dt.data) {
                setTotalProductCategories(dt.data.total);
            }
        })
        getAllStockTransactions({ page: 1, per_page: 1 }).then((dt) => {
            if (dt.data) {
                setTotalStockTransactions(dt.data.total);
            }
        })
        setTimeout(() => {
            loading.hideLoading();
        }, 500);
    }, [])


    const data = {
        labels: ['Transactions', 'Products', 'Product Categories'],
        datasets: [
            {
                label: 'Statistics',
                data: [totalStockTransactions, totalProducts, totalProductCategories],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    const updates = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];
    return (
        <MainLayout>
            <div className="bg-white p-10 rounded-sm min-h-full">
                <p className="text-md text-black ">Welcome <span className="font-semibold italic">{localStorage.getItem('email')}</span>, how are you today ?</p>
                <div className="flex flex-row flex-1 p-20 py-10 gap-10 justify-center flex-wrap">
                    <Card icon={<UserOutlined />} color="text-pink-600" title="Total Users" value={totalUsers} />
                    <Card icon={<UserOutlined />} color="text-blue-400" title="Total Transactions" value={totalStockTransactions} />
                    <Card icon={<UserOutlined />} color="text-yellow-400" title="Total Products" value={totalProducts} />
                    <Card icon={<UserOutlined />} color="text-teal-400" title="Total Categories" value={totalProductCategories} />
                </div>
                <div className="flex flex-row flex-1 mx-4 flex-wrap">
                    <div className="flex-1 flex flex-row justify-center items-center">
                        <div className="lg:w-96 md:w-80">
                            <Doughnut data={data} />
                        </div>
                    </div>
                    <div className="flex-1 mt-10">
                        <div className="border-[0.5px] border-gray-500 p-2 rounded-2xl">
                            <List
                                itemLayout="horizontal"
                                dataSource={updates}
                                renderItem={(item, index) => (
                                    <List.Item className="hover:scale-105 hover:z-50 bg-white cursor-pointer hover:border-[0.5px] hover:border-gray-400 hover:rounded-2xl transition">
                                        <List.Item.Meta
                                            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                            title={<a href="https://ant.design">{item.title}</a>}
                                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

const Card = ({ color, title, value }: { icon: React.ReactNode; color: string; title: string; value: number }) => (
    <div className="shadow-md w-52 hover:scale-110 hover:cursor-pointer transition bg-white items-center justify-center p-10 text-center gap-3 flex-col flex rounded-sm">
        <p className={`font-sans text-xs ${color}`}>{title}</p>
        <p className="font-semibold text-xl">{value}</p>
    </div>
);

export default HomePage;