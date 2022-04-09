import React from 'react';


const Layout = ({children}) => (
    <div className="d-flex flex-column min-vh-100">
        <>{children}</>
    </div>
);

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
