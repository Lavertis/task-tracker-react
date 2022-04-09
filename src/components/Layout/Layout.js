import React from 'react';
import Navbar from "../Navbar/Navbar";


const Layout = ({children}) => (
    <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        <>{children}</>
    </div>
);

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
