import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAllUsers, type User } from "../../services/users-service";
import DashboardPage from "../DashboardPage";

interface DataType extends User {
    key: React.Key;
}
const MainPage = () => {
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
            <div className="bg-white p-10 rounded-sm min-h-full">
                <p className="text-md text-black ">Welcome <span className="font-semibold italic">{localStorage.getItem('email')}</span>, how are you today ?</p>
                <div className="flex flex-row flex-1 p-20 gap-10 justify-center flex-wrap">
                    <Card icon={<UserOutlined />} color="text-pink-600" title="Total Users" value={users.length} />
                    <Card icon={<UserOutlined />} color="text-purple-600" title="Total Transactions" value={users.length} />
                    <Card icon={<UserOutlined />} color="text-blue-600" title="Total Products" value={users.length} />
                    <Card icon={<UserOutlined />} color="text-orange-600" title="Total Categories" value={users.length} />
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

export default MainPage;