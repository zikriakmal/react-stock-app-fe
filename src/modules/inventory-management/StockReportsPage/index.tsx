import { UserOutlined } from "@ant-design/icons";
import type { CalendarProps } from 'antd';
import { Calendar } from "antd";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import type { Dayjs } from 'dayjs';
import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import Card from "../../../components/molecules/Card";
import { useLoading } from "../../../contexts/LoadingContext";
import MainLayout from "../../../layouts/MainLayout";
import { getAllProductCategory } from "../../../services/product-categories-service";
import { getAllProduct } from "../../../services/products-service";
import { getAllStockTransactions } from "../../../services/stock-service";

ChartJS.register(ArcElement, Tooltip, Legend);


const StockReportsPage: React.FC<any> = () => {

    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalProductCategories, setTotalProductCategories] = useState<number>(0);
    const [totalStockTransactions, setTotalStockTransactions] = useState<number>(0);

    const loading = useLoading();

    useEffect(() => {
        loading.showLoading();
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

    const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <MainLayout>
            <div className="bg-white p-10 rounded-sm ">
                <div className="flex flex-row flex-1 p-20 py-10 gap-10 justify-center flex-wrap">
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
                    <div className="flex-1">
                        <Calendar onPanelChange={onPanelChange} />
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

export default StockReportsPage;