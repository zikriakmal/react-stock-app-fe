import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import Header from '../../components/organisms/Header';
import SideNavigation from '../../components/organisms/SideNavigation';

const DashboardPage: React.FC<any> = (props) => {
    const navigation = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigation('/login');
        }
    }, [])

    return (
        <div style={{ background: "url('/login-page.jpg') no-repeat" }} className='flex flex-row'>
            <div>
                <SideNavigation />
            </div>
            <div className='bg-gray-50/60 backdrop-blur-sm flex-1 flex flex-col min-h-dvh'>
                <Header />
                {/* content here */}
                <div className='flex flex-col flex-1 p-5 px-10'>
                    {props.children}
                </div>
            </div>
        </div >
    );
};

export default DashboardPage;