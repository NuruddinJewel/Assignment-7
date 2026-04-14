import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Banner from '../Banner';
import Footer from '../Footer';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-base-100">
            <Navbar />
            <Banner />
            <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;