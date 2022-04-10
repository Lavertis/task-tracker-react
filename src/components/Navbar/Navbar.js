import React from 'react';
import UserDropdown from "./UserDropdown";
import NavLink from "./NavLink";

const Navbar = () => {
    const user = localStorage.getItem("token");
    const email = user ? JSON.parse(atob(user.split('.')[1])).email : null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
            <div className="container-fluid">
                <span className="navbar-brand">Task Tracker</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <NavLink to="/" text="Home"/>
                        <NavLink to="/tasks/user" text="My Tasks"/>
                        <NavLink to="/tasks/user/assigned" text="Assigned Tasks"/>
                        <NavLink to="/tasks/user/pending" text="Pending Tasks"/>
                        <NavLink to="/tasks/user/completed" text="Completed Tasks"/>
                        <NavLink to="/tasks/create" text="Create Task"/>
                    </ul>
                    <div className="nav-item dropdown ms-auto">
                        <ul className="navbar-nav">
                            {!user &&
                                <>
                                    <NavLink to="/login" text="Login"/>
                                    <NavLink to="/register" text="Register"/>
                                </>
                            }
                            {user && UserDropdown(email)}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;