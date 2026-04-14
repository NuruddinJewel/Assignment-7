import React from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import { useFriends } from '../context/FriendsContext';

const TAG_COLORS = [
    'bg-violet-100 text-violet-700',
    'bg-sky-100 text-sky-700',
    'bg-teal-100 text-teal-700',
    'bg-pink-100 text-pink-700',
    'bg-orange-100 text-orange-700',
];

const getTagColor = (tag) => {
    const idx = tag.charCodeAt(0) % TAG_COLORS.length;
    return TAG_COLORS[idx];
};

const getStatusBadge = (friend) => {
    const { days_since_contact, goal, status } = friend;
    const ratio = days_since_contact / goal;

    if (status === 'overdue' || days_since_contact > goal) {
        return (
            <span className="badge badge-sm font-semibold text-xs px-2 py-1 rounded-full bg-red-100 text-red-600 border-0">
                Overdue
            </span>
        );
    }
    if (ratio >= 0.8) {
        return (
            <span className="badge badge-sm font-semibold text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-600 border-0">
                Almost Due
            </span>
        );
    }
    return (
        <span className="badge badge-sm font-semibold text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-600 border-0">
            On Track
        </span>
    );
};


const FriendCard = ({ friend }) => (
    <Link to={`/friend/${friend.id}`} className="block group">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer h-full">
            <img
                src={friend.picture}
                alt={friend.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow"
                onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=6366f1&color=fff`;
                }}
            />
            <div className="text-center">
                <p className="font-semibold text-gray-800 text-sm leading-tight">{friend.name}</p>
                <div className="flex items-center justify-center gap-1 mt-0.5 text-gray-400 text-xs">
                    <FiClock size={11} />
                    <span>{friend.days_since_contact}d ago</span>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-1">
                {friend.tags.map((tag) => (
                    <span
                        key={tag}
                        className={`text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${getTagColor(tag)}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div>{getStatusBadge(friend)}</div>
        </div>
    </Link>
);



const Cards = () => {
    const { friends, loading } = useFriends();

    if (loading) return <p className="text-center py-10 text-gray-400">Loading...</p>;

    const total = friends.length;
    const onTrack = friends.filter(
        (f) => f.status !== 'overdue' && f.days_since_contact / f.goal < 0.8
    ).length;
    const needAttention = friends.filter(
        (f) => f.status === 'overdue' || f.days_since_contact / f.goal >= 0.8
    ).length;
    const interactions = friends.reduce((acc, f) => acc + f.days_since_contact, 0);

    const stats = [
        { label: 'Total Friends', value: total },
        { label: 'On Track', value: onTrack },
        { label: 'Need Attention', value: needAttention },
        { label: 'Interactions This Month', value: interactions },
    ];

    return (
        <div className="min-h-screen bg-white px-6 py-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center justify-center"
                    >
                        <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                        <span className="text-xs text-gray-400 mt-1 text-center">{stat.label}</span>
                    </div>
                ))}
            </div>
            <h2 className="text-lg font-semibold text-gray-700 mb-5">Your Friends</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {friends.map((friend) => (
                    <FriendCard key={friend.id} friend={friend} />
                ))}
            </div>
        </div>
    );
};

export default Cards;