import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { getAllProductCategory, type ProductCategory } from "../../services/product-categories-service";
import { getAllProduct, type Product } from "../../services/products-service";
import { getAllStockTransactions, type StockTransaction } from "../../services/stock-service";
import { getAllUsers, type User } from "../../services/users-service";
import DashboardPage from "../DashboardPage";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Avatar, List } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);

const HomePage: React.FC<any> = () => {
    const [users, setUsers] = useState<User[]>();
    const [products, setProducts] = useState<Product[]>();
    const [productCategories, setProductCategories] = useState<ProductCategory[]>();
    const [stockTransactions, setStockTransactions] = useState<StockTransaction[]>();

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
        getAllProduct().then((dt) => {
            setProducts(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }))
        })
        getAllProductCategory().then((dt) => {
            setProductCategories(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }))
        })
        getAllStockTransactions().then((dt) => {
            setStockTransactions(dt.data.map((dt) => {
                const newDt = {
                    key: dt.id.toString(),
                    ...dt
                }
                return newDt
            }))
        })
    }, []);

    const data = {
        labels: ['Users', 'Transactions', 'Products', 'Categories'],
        datasets: [
            {
                label: 'Statistics',
                data: [
                    users?.length ?? 0,
                    stockTransactions?.length ?? 0,
                    products?.length ?? 0,
                    productCategories?.length ?? 0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
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
        <DashboardPage>
            <div className="bg-white p-10 rounded-sm min-h-full">
                <p className="text-md text-black ">Welcome <span className="font-semibold italic">{localStorage.getItem('email')}</span>, how are you today ?</p>
                <div className="flex flex-row flex-1 p-20 py-10 gap-10 justify-center flex-wrap">
                    <Card icon={<UserOutlined />} color="text-pink-600" title="Total Users" value={users?.length ?? 0} />
                    <Card icon={<UserOutlined />} color="text-blue-400" title="Total Transactions" value={stockTransactions?.length ?? 0} />
                    <Card icon={<UserOutlined />} color="text-yellow-400" title="Total Products" value={products?.length ?? 0} />
                    <Card icon={<UserOutlined />} color="text-teal-400" title="Total Categories" value={productCategories?.length ?? 0} />
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
        </DashboardPage>
    )
}

const Card = ({ color, title, value }: { icon: React.ReactNode; color: string; title: string; value: number }) => (
    <div className="shadow-md w-52 hover:scale-110 hover:cursor-pointer transition bg-white items-center justify-center p-10 text-center gap-3 flex-col flex rounded-sm">
        <p className={`font-sans text-xs ${color}`}>{title}</p>
        <p className="font-semibold text-xl">{value}</p>
    </div>
);

export default HomePage;