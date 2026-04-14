import React, { Suspense } from 'react';
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
                <Suspense
                    fallback={
                        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50">
                            {/* Added a simple spinner and better text for visibility */}
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                            <p className="mt-4 text-lg font-medium text-gray-600">Loading Contents...</p>
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
};

export default Layout;


