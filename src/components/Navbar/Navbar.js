import React from 'react';
import {Link, useLocation} from "react-router-dom";
import UserDropdown from "./UserDropdown";
import AuthLinks from "./AuthLinks";

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const user = localStorage.getItem("token");
    const email = user ? JSON.parse(atob(user.split('.')[1])).email : null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">Task Tracker</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className={currentPath === '/' ? 'nav-link active' : 'nav-link'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tasks/create"
                                  className={currentPath === '/tasks/create' ? 'nav-link active' : 'nav-link'}>Create
                                Task</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tasks"
                                  className={currentPath === '/tasks' ? 'nav-link active' : 'nav-link'}>Tasks</Link>
                        </li>
                    </ul>
                    <div className="nav-item dropdown ms-auto">
                        {!user && AuthLinks(currentPath)}
                        {user && UserDropdown(currentPath, email)}
                    </div>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;