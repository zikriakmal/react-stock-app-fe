import type { JSX } from "react"
import { useNavigate } from "react-router"
import NavChild from "../../molecules/NavChild"



const SideNavigation = (): JSX.Element => {
    const navigation = useNavigate()
    return (
        <div className='w-64 min-h-dvh border-r-[0.5px] border-r-gray-500 p-10'>
            <p onClick={() => navigation('/')} className='mb-10 text-center text-white text-2xl font-bold cursor-pointer'>{'Product Stock App'}</p>
            <div className='flex flex-col gap-10'>
                <NavChild label={'Stock Transactions'} routeUri="/stock-transactions" />
                <div className='w-full h-[0.2px] bg-white' />
                <div className='flex flex-col gap-10'>
                    <p className='ml-2 text-white font-stretch-condensed'>{'MASTER DATA'}</p>
                    <NavChild label={'Products'} routeUri="/products" />
                    <NavChild label={'Product Category'} routeUri="/product-categories" />
                    <NavChild label={'Users'} routeUri="/users" />
                </div>
            </div>
        </div>
    )
}


export default SideNavigation