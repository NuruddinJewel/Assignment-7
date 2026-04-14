// import React from 'react';
// import { Outlet } from 'react-router';
// import Navbar from '../Navbar';
// import Banner from '../Banner';
// const Layout = () => {
//     return (
//         <div>
//             <Navbar />
//             <Banner />
//             <Outlet />
//         </div>
//     );
// };

// export default Layout;

// import React from 'react';
// import { Outlet, NavLink, Link } from 'react-router-dom';
// import { FiUsers, FiBarChart2, FiClock, FiHeart } from 'react-icons/fi';

// const Navbar = () => {
//     const navItems = [
//         { to: '/', label: 'Home', icon: <FiHeart size={16} />, end: true },
//         { to: '/friends', label: 'Friends', icon: <FiUsers size={16} /> },
//         { to: '/timeline', label: 'Timeline', icon: <FiClock size={16} /> },
//         { to: '/stats', label: 'Stats', icon: <FiBarChart2 size={16} /> },
//     ];

//     return (
//         <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
//             <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
//                 {/* Logo */}
//                 <Link to="/" className="flex items-center gap-2 group">
//                     <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center shadow">
//                         <FiHeart size={16} className="text-white" />
//                     </div>
//                     <span className="font-bold text-gray-800 text-base tracking-tight">FriendKeep</span>
//                 </Link>

//                 {/* Nav Links */}
//                 <div className="flex items-center gap-1">
//                     {navItems.map(({ to, label, icon, end }) => (
//                         <NavLink
//                             key={to}
//                             to={to}
//                             end={end}
//                             className={({ isActive }) =>
//                                 `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${isActive
//                                     ? 'bg-indigo-50 text-indigo-600'
//                                     : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
//                                 }`
//                             }
//                         >
//                             {icon}
//                             <span className="hidden sm:inline">{label}</span>
//                         </NavLink>
//                     ))}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// const Banner = () => (
//     <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-10 px-6 text-center">
//         <h1 className="text-2xl font-bold tracking-tight">Stay Close to the People Who Matter</h1>
//         <p className="text-indigo-100 text-sm mt-2 max-w-md mx-auto">
//             Track your friendships, never miss a check-in, and keep meaningful connections alive.
//         </p>
//     </div>
// );

// const Layout = () => {
//     return (
//         <div className="min-h-screen bg-gray-50">
//             <Navbar />
//             <Banner />
//             <main>
//                 <Outlet />
//             </main>
//         </div>
//     );
// };

// export default Layout;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Banner from '../Banner';

const Layout = () => {
    return (
        <div className="min-h-screen bg-base-100">
            <Navbar />
            <Banner />
            {/* Cards and all other route content renders here, below the banner */}
            <main className="max-w-5xl mx-auto px-6 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;