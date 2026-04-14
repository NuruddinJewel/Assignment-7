import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Banner = () => {
    return (
        <div className="hero min-h-70 bg-base-100">
            <div className="hero-content text-center">
                <div className="max-w-2xl">
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-4xl font-bold text-[#1F2937] mb-4">
                        Friends to keep close in your life
                    </h1>

                    {/* Description */}
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8 px-4">
                        Your personal shelf of meaningful connections. Browse, tend, and nurture the <br />
                        relationships that matter most.
                    </p>

                    {/* Action Button */}
                    {/* <Link to="/add-friend"> */}
                    <button className="btn bg-[#2D4F43] hover:bg-[#233d34] border-none text-white normal-case px-8 rounded-md gap-2">
                        <FaPlus className="text-sm" />
                        Add a Friend
                    </button>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
};

export default Banner;