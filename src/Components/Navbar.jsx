import React from 'react';
import { NavLink } from 'react-router-dom';
import { House, Clock, ChartLine } from 'lucide-react';

const Navbar = () => {
    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold ${isActive
            ? "bg-[#2D4F42] text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100 hover:text-[#2D4F42]"
        }`;

    return (
        <nav className="navbar bg-white border-b border-gray-100 px-6 py-4">
            {/* Left side: Logo */}
            <div className="flex-1">
                <NavLink to="/" className="flex items-center gap-1 cursor-pointer select-none">
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">Keen</span>
                    <span className="text-2xl font-bold text-[#2D4F42] tracking-tight">Keeper</span>
                </NavLink>
            </div>

            {/* Right side: Navigation Items */}
            <div className="flex-none">
                <ul className="flex flex-row px-1 gap-2 items-center">
                    <li>
                        <NavLink to="/" end className={navLinkClasses}>
                            <House size={18} />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/timeline" className={navLinkClasses}>
                            <Clock size={18} />
                            <span>Timeline</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/stats" className={navLinkClasses}>
                            <ChartLine size={18} />
                            <span>Stats</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;