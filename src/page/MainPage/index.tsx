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
            <div>
                <div className="flex flex-row flex-1 p-20 gap-10 justify-center flex-wrap">
                    <div className="shadow-md bg-white items-center justify-center p-10 text-center gap-5 flex-col flex rounded-sm">
                        <p className="font-sans text-xl text-pink-600">Total Users</p>
                        <p className="font-semibold text-md">{users.length}</p>
                    </div>
                    <div className="shadow-md bg-white items-center justify-center p-10 text-center gap-5 flex-col flex rounded-sm">
                        <p className="font-sans text-xl text-purple-900">Total Users</p>
                        <p className="font-semibold text-md">{users.length}</p>
                    </div>
                    <div className="shadow-md bg-white items-center justify-center p-10 text-center gap-5 flex-col flex rounded-sm">
                        <p className="font-sans text-xl text-blue-950">Total Users</p>
                        <p className="font-semibold text-md">{users.length}</p>
                    </div>
                    <div className="shadow-md bg-white items-center justify-center p-10 text-center gap-5 flex-col flex rounded-sm">
                        <p className="font-sans text-xl text-orange-900">Total Users</p>
                        <p className="font-semibold text-md">{users.length}</p>
                    </div>
                </div>
            </div>
        </DashboardPage>
    )
}

export default MainPage;