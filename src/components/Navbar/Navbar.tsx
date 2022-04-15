import React, {FC} from 'react';
import NavbarLink from "../NavbarLink/NavbarLink";
import NavbarUserDropdown from "../NavbarUserDropdown/NavbarUserDropdown";


interface NavbarProps {
}

const Navbar: FC<NavbarProps> = () => {
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
                        <NavbarLink to="/" text="Home"/>
                        <NavbarLink to="/tasks/user/all" text="My Tasks"/>
                        <NavbarLink to="/tasks/user/orders" text="Task Orders"/>
                        {/*<NavbarLink to="/tasks/user/pending" text="Pending Tasks"/>*/}
                        {/*<NavbarLink to="/tasks/user/completed" text="Completed Tasks"/>*/}
                        <NavbarLink to="/tasks/create" text="Create Task"/>
                    </ul>
                    <div className="nav-item dropdown ms-auto">
                        <ul className="navbar-nav">
                            {!user &&
                                <>
                                    <NavbarLink to="/login" text="Login"/>
                                    <NavbarLink to="/register" text="Register"/>
                                </>
                            }
                            {user && <NavbarUserDropdown email={email}/>}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
