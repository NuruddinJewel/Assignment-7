import React from 'react';
import { FaYoutube, FaFacebookF, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-[#2D4F42] text-white">
            {/* Top section */}
            <div className="flex flex-col items-center justify-center py-14 px-6 text-center border-b border-white/10">
                <h2 className="text-5xl font-bold tracking-tight mb-4">
                    <span>Keen</span><span>Keeper</span>
                </h2>
                <p className="text-white/60 text-sm max-w-lg">
                    Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
                </p>

                {/* Social Links */}
                <p className="text-white font-semibold text-sm mt-8 mb-3">Social Links</p>
                <div className="flex items-center gap-3">
                    <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                        aria-label="YouTube"
                    >
                        <FaYoutube size={16} className="text-white" />
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                        aria-label="Facebook"
                    >
                        <FaFacebookF size={16} className="text-white" />
                    </a>
                    <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors duration-200"
                        aria-label="X / Twitter"
                    >
                        <FaXTwitter size={16} className="text-white" />
                    </a>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-10 py-5 text-white/50 text-xs gap-3">
                <p>© 2026 KeenKeeper. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors duration-200">Cookies</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;