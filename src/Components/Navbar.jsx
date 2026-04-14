import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { House, Clock, ChartLine, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200 font-semibold ${isActive
            ? "bg-[#2D4F42] text-white shadow-md"
            : "text-gray-700 hover:bg-gray-100 hover:text-[#2D4F42]"
        }`;

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-white border-b border-gray-100 relative">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Left side: Logo */}
                <div className="flex-1">
                    <NavLink to="/" className="flex items-center gap-1 cursor-pointer select-none">
                        <span className="text-2xl font-bold text-slate-800 tracking-tight">Keen</span>
                        <span className="text-2xl font-bold text-[#2D4F42] tracking-tight">Keeper</span>
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 hover:text-[#2D4F42] focus:outline-none"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:block flex-none">
                    <ul className="flex flex-row gap-2 items-center">
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
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 border-t border-gray-100' : 'max-h-0'}`}>
                <ul className="flex flex-col p-4 gap-2 bg-white">
                    <li>
                        <NavLink to="/" end className={navLinkClasses} onClick={() => setIsOpen(false)}>
                            <House size={18} />
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/timeline" className={navLinkClasses} onClick={() => setIsOpen(false)}>
                            <Clock size={18} />
                            <span>Timeline</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/stats" className={navLinkClasses} onClick={() => setIsOpen(false)}>
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