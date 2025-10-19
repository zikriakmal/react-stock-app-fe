import React, { useEffect } from 'react';
import { useNavigate } from "react-router";
import Header from '../../components/organisms/Header';
import SideNavigation from '../../components/organisms/SideNavigation';

const MainLayout: React.FC<any> = (props) => {
    const navigation = useNavigate();
    useEffect(() => {
        checkAuthorization();
    }, [])
    const checkAuthorization = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            navigation('/login');
        }
    }
    return (
        <div className='flex flex-row bg-gray-800   '>
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

export default MainLayout;