import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar';
import Banner from '../Banner';
const Layout = () => {
    return (
        <div>
            <Navbar />
            <Banner />
            <Outlet />
        </div>
    );
};

export default Layout;

