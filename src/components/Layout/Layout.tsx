import React, {FC, ReactNode} from 'react';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


interface LayoutProps {
    children: ReactNode
}

const Layout: FC<LayoutProps> = ({children}) => (
    <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        <>{children}</>
        <Footer/>
    </div>
);

export default Layout;
