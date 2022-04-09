import {Link} from "react-router-dom";
import React from "react";

const UserDropdown = (currentPath, email) => {
    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <button className="btn shadow-none nav-link dropdown-toggle" id="navbarDropdownMenuLink"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    {email}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link to="/account" className="dropdown-item" href="#">Account</Link></li>
                    <li>
                        <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </li>
        </ul>
    );
};

UserDropdown.propTypes = {};

UserDropdown.defaultProps = {};

export default UserDropdown;