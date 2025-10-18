import { HomeFilled, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Dropdown, type MenuProps } from "antd";
import { useNavigate } from "react-router";
import Clock from "../../molecules/Clock";

const Header = () => {
    const navigation = useNavigate();
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
        <div className='flex flex-row justify-between bg-white/60  px-10 pt-0 pb-2.5     items-center'>
            {location.pathname === '/' ?
                <a className='!text-pink-600 w-32 font-semibold text-sm hover:-translate-y-1 transition p-2' href={'/'}><HomeFilled className='pr-1' /> Home</a> :
                <Breadcrumb
                    className='w-32 sm:w-48'
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
            <div className='flex-1 justify-center items-center flex'>
                <Clock />
            </div>
            <div>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <div className='flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl hover:-translate-y-0.5 transition px-4  hover:shadow-sm'>
                        <p className='text-sm font-stretch-110%'>{localStorage.getItem('email')}</p>
                        <div className='h-12 w-12 items-center justify-center flex flex-col rounded-full bg-gray-100' onClick={(e) => e.preventDefault()}>
                            <UserOutlined style={{ fontSize: 18 }} />
                        </div>
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}

export default Header;