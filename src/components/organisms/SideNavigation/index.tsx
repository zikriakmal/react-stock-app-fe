import type { JSX } from "react"
import { useNavigate } from "react-router"
import NavChild from "../../molecules/NavChild"


interface MenuType {
    name: string,
    route: string,
    children: {
        name: string,
        route: string
    }[]
}

const menu: MenuType[] = [
    {
        name: 'Inventory Management',
        route: '/inventory-management',
        children: [
            {
                name: "Stock Reports",
                route: "/stock-reports"
            },
            {
                name: "Stock Transactions",
                route: "/stock-transactions"
            },
            {
                name: "Products",
                route: "/products"
            },
            {
                name: "Product Categories",
                route: "/product-categories"
            }
        ]
    },
    {
        name: 'Administrations',
        route: '/administrations',
        children: [
            {
                name: "User",
                route: "/users"
            }
        ]
    },
]


const SideNavigation = (): JSX.Element => {
    const navigation = useNavigate()
    return (
        <div className='w-64 min-h-dvh border-r-[0.5px] border-r-gray-500 p-10'>
            <p onClick={() => navigation('/')} className='mb-10 text-center text-white text-2xl font-bold cursor-pointer'>{'Product Stock App'}</p>
            <div className='flex flex-col gap-5'>
                {menu.map((dt) => {
                    return (
                        <div key={dt.route}>
                            <div className='flex flex-col gap-6'>
                                <p className='ml-2 text-pink-300 font-stretch-condensed text-lg'>{dt.name}</p>
                                {dt.children.map((dt2) => {
                                    return (
                                        <NavChild key={dt2.route} label={dt2.name} routeUri={dt2.route} />
                                    )
                                })}
                            </div>
                            <div className="gap-1 flex flex-col mb-5 mt-10">
                                <div className='w-full h-[0.2px] bg-white' />
                                <div className='w-full h-[0.2px] bg-white' />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default SideNavigation