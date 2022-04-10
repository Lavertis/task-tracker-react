import React, {FC} from 'react';
import {Link, useLocation} from "react-router-dom";


interface NavbarLinkProps {
    to: string;
    text: string;
}

const NavbarLink: FC<NavbarLinkProps> = ({to, text}) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const isActive = currentPath === to;

    return (
        <li className="nav-item">
            <Link to={to}
                  className={isActive ? 'nav-link active' : 'nav-link'}>
                {text}
            </Link>
        </li>
    );
}

export default NavbarLink;
