import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFriends } from '../context/FriendsContext';
import toast from 'react-hot-toast';
import {
    FiArrowLeft, FiPhone, FiMessageSquare, FiVideo,
    FiArchive, FiTrash2, FiBellOff
} from 'react-icons/fi';

// ── UTILITIES ──────────────────────────────────────────────────────────────

const getStatusBadge = (friend) => {
    const { days_since_contact, goal, status } = friend;
    const ratio = days_since_contact / goal;

    if (status === 'overdue' || days_since_contact > goal)
        return <span className="badge badge-sm bg-red-500 text-white border-0 px-3">Overdue</span>;
    if (ratio >= 0.8)
        return <span className="badge badge-sm bg-amber-400 text-white border-0 px-3">Almost Due</span>;
    return <span className="badge badge-sm bg-emerald-500 text-white border-0 px-3">On Track</span>;
};

const TAG_COLORS = [
    'bg-violet-100 text-violet-700',
    'bg-sky-100 text-sky-700',
    'bg-teal-100 text-teal-700',
    'bg-pink-100 text-pink-700',
    'bg-orange-100 text-orange-700',
];

const getTagColor = (tag) => TAG_COLORS[tag.charCodeAt(0) % TAG_COLORS.length];

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const TYPE_ICON = { Call: '📞', Text: '💬', Video: '🎥' };

// ── MAIN COMPONENT ──────────────────────────────────────────────────────────

const FriendDetail = () => {
    const { id } = useParams();
    const { friends, loading, addTimelineEntry } = useFriends();
    const [editingGoal, setEditingGoal] = useState(false);
    const [goalDays, setGoalDays] = useState(null);

    // ── LOADING STATE ─────────────────────────────────────────────────────────
    if (loading) {
        return (
            // <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            //     <span className="loading loading-spinner loading-lg text-[#2D4F42]"></span>
            //     <p className="text-gray-500 animate-pulse font-medium">Fetching friend data...</p>
            // </div>

            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 animate-in fade-in duration-700">
                {/* Outer ring for extra visual weight */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-16 h-16 border-4 border-[#2D4F42]/10 rounded-full"></div>
                    <span className="loading loading-spinner w-12 text-[#2D4F42] opacity-90"></span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <p className="text-lg font-semibold text-slate-700 tracking-wide animate-pulse">
                        Gathering Details
                    </p>
                    <p className="text-sm text-gray-400 font-medium tracking-tight">
                        Just a moment while we sync your data...
                    </p>
                </div>
            </div>


        );
    }

    const friend = friends.find((f) => f.id === parseInt(id));

    if (!friend) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-4">Friend not found.</p>
                <Link to="/" className="btn btn-outline btn-sm text-[#2D4F42]">
                    <FiArrowLeft /> Back to home
                </Link>
            </div>
        );
    }

    const currentGoal = goalDays ?? friend.goal;

    const handleCheckIn = (type) => {
        addTimelineEntry(type, friend.name);
        toast.success(`${TYPE_ICON[type]} ${type} with ${friend.name} logged!`, {
            position: 'top-right',
            style: { borderRadius: '12px', background: '#333', color: '#fff' }
        });
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#2D4F42] mb-8 transition-colors group"
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to friends
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* ── LEFT COLUMN: PROFILE ────────────────────────────────────────── */}
                <div className="flex flex-col gap-4">
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-sm">
                        <div className="relative">
                            <img
                                src={friend.picture}
                                alt={friend.name}
                                className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50 shadow-md"
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2D4F42&color=fff`;
                                }}
                            />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{friend.name}</h2>
                        {getStatusBadge(friend)}
                        <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                            {friend.tags.map((tag) => (
                                <span key={tag} className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getTagColor(tag)}`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 italic mt-2 leading-relaxed">"{friend.bio}"</p>
                        <a href={`mailto:${friend.email}`} className="text-xs text-[#2D4F42] hover:underline font-medium">
                            {friend.email}
                        </a>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
                        <button className="w-full flex items-center gap-3 px-5 py-4 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <FiBellOff size={16} className="text-gray-400" /> Snooze 2 Weeks
                        </button>
                        <button className="w-full flex items-center gap-3 px-5 py-4 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <FiArchive size={16} className="text-gray-400" /> Archive Friend
                        </button>
                        <button className="w-full flex items-center gap-3 px-5 py-4 text-sm text-red-500 hover:bg-red-50 transition-colors">
                            <FiTrash2 size={16} className="text-red-400" /> Delete Contact
                        </button>
                    </div>
                </div>

                {/* ── RIGHT COLUMN: STATS & ACTION ─────────────────────────────────── */}
                <div className="md:col-span-2 flex flex-col gap-6">

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center">
                            <span className="block text-3xl font-bold text-gray-800">{friend.days_since_contact}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 block">Days Since</span>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center">
                            <span className="block text-3xl font-bold text-gray-800">{currentGoal}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 block">Goal</span>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 text-center">
                            <span className="block text-lg font-bold text-gray-800 leading-tight">{formatDate(friend.next_due_date)}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2 block">Next Due</span>
                        </div>
                    </div>

                    {/* Relationship Goal Card */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Relationship Goal</h3>
                            <button
                                onClick={() => setEditingGoal(!editingGoal)}
                                className={`text-xs px-4 py-1.5 rounded-full transition-all ${editingGoal ? 'bg-[#2D4F42] text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {editingGoal ? 'Save Changes' : 'Edit Goal'}
                            </button>
                        </div>

                        <div className="flex items-center gap-3 mb-6">
                            {editingGoal ? (
                                <div className="flex items-center gap-3 animate-in slide-in-from-left-2">
                                    <span className="text-sm text-gray-500">Connect every</span>
                                    <input
                                        type="number"
                                        value={goalDays ?? friend.goal}
                                        min={1}
                                        onChange={(e) => setGoalDays(Number(e.target.value))}
                                        className="input input-sm input-bordered w-20 text-center font-bold text-[#2D4F42]"
                                    />
                                    <span className="text-sm text-gray-500">days</span>
                                </div>
                            ) : (
                                <p className="text-gray-600">
                                    You aim to connect every <strong className="text-gray-900 text-lg">{currentGoal} days</strong>
                                </p>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-gray-400">{friend.days_since_contact} days elapsed</span>
                                <span className={friend.days_since_contact > currentGoal ? "text-red-500" : "text-emerald-500"}>
                                    {friend.days_since_contact > currentGoal ? 'Overdue' : 'On Track'}
                                </span>
                            </div>
                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ease-out ${friend.days_since_contact > currentGoal ? 'bg-red-500' :
                                        friend.days_since_contact / currentGoal >= 0.8 ? 'bg-amber-400' : 'bg-[#2D4F42]'
                                        }`}
                                    style={{ width: `${Math.min((friend.days_since_contact / currentGoal) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Check-In Card */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-5">Log Interaction</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { type: 'Call', Icon: FiPhone, color: 'hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50' },
                                { type: 'Text', Icon: FiMessageSquare, color: 'hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50' },
                                { type: 'Video', Icon: FiVideo, color: 'hover:text-purple-600 hover:border-purple-200 hover:bg-purple-50' },
                            ].map(({ type, Icon, color }) => (
                                <button
                                    key={type}
                                    onClick={() => handleCheckIn(type)}
                                    className={`flex flex-col items-center justify-center gap-3 border border-gray-100 rounded-xl py-6 transition-all duration-300 group ${color}`}
                                >
                                    <Icon size={24} className="text-gray-400 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-semibold text-gray-600 group-hover:text-inherit">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FriendDetail;