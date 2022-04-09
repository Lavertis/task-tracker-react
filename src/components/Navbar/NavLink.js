import React from 'react';
import {Link, useLocation} from "react-router-dom";


const NavLink = ({to, text}) => {
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

NavLink.propTypes = {};

NavLink.defaultProps = {};

export default NavLink;
