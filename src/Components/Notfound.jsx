import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

const NotFound = () => {
    const { pathname } = useLocation();

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-16">
            {/* Big 404 */}
            <h1 className="text-8xl font-bold text-[#2D4F42] opacity-20 select-none leading-none">
                404
            </h1>

            <div className="mt-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-800">Page not found</h2>
                <p className="text-gray-400 text-sm mt-2 max-w-sm">
                    The route{' '}
                    <code className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs font-mono">
                        {pathname}
                    </code>{' '}
                    doesn't exist. It may have been moved or mistyped.
                </p>
            </div>

            <div className="flex items-center gap-3 mt-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2D4F42] text-white text-sm font-semibold rounded-xl hover:bg-[#233d34] transition-colors duration-200"
                >
                    <FiHome size={15} />
                    Back to Home
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                    <FiArrowLeft size={15} />
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default NotFound;