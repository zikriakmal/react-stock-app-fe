import type { FC, JSX } from "react";
import { Link } from "react-router";

interface NavChildProps {
    label: string,
    routeUri: string,
}

const NavChild: FC<NavChildProps> = (props): JSX.Element => {
    const { label, routeUri } = props
    return (
        <Link className={(location.pathname === routeUri ?
            'bg-white drop-shadow-2x px-10 !text-black font-bold' : "") + ' left-side-link  hover:scale-105 transition'}
            to={routeUri} > {label}
        </Link >
    )
}

export default NavChild;