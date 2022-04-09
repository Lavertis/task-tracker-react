import {Link} from "react-router-dom";
import React from "react";

const AuthLinks = (currentPath) => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link to="/login"
                      className={currentPath === '/login' ? 'nav-link active' : 'nav-link'}>
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/register"
                      className={currentPath === '/register' ? 'nav-link active' : 'nav-link'}>
                    Register
                </Link>
            </li>
        </ul>
    );
};

AuthLinks.propTypes = {};

AuthLinks.defaultProps = {};

export default AuthLinks;