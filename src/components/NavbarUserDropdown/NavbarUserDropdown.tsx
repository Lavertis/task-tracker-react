import React, {FC} from 'react';
import {Link, useLocation} from "react-router-dom";


interface NavbarUserDropdownProps {
    email: string
}

const NavbarUserDropdown: FC<NavbarUserDropdownProps> = ({email}) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.href = "/"
    }

    return (
        <li className="nav-item dropdown">
            <button className={
                ['/account'].includes(currentPath) ?
                    'btn shadow-none nav-link dropdown-toggle active' :
                    'btn shadow-none nav-link dropdown-toggle'}
                    id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">{email}</button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><Link to="/account" className="dropdown-item">Account</Link></li>
                <li>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </li>
    );
}

export default NavbarUserDropdown;
