import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFriends } from '../context/FriendsContext';
import { FiArrowLeft, FiPhone, FiMessageSquare, FiVideo, FiArchive, FiTrash2, FiBellOff } from 'react-icons/fi';

const getStatusBadge = (friend) => {
    const { days_since_contact, goal, status } = friend;
    const ratio = days_since_contact / goal;

    if (status === 'overdue' || days_since_contact > goal) {
        return <span className="badge badge-sm bg-red-500 text-white border-0 px-3">Overdue</span>;
    }
    if (ratio >= 0.8) {
        return <span className="badge badge-sm bg-amber-400 text-white border-0 px-3">Almost Due</span>;
    }
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

const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// ── main component ────────────────────────────────────────────────────────────

const FriendDetail = () => {
    const { id } = useParams();
    const { friends, loading } = useFriends();
    const [editingGoal, setEditingGoal] = useState(false);
    const [goalDays, setGoalDays] = useState(null);

    if (loading) return <p className="text-center py-10 text-gray-400">Loading...</p>;

    const friend = friends.find((f) => f.id === parseInt(id));

    if (!friend) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-400 text-lg">Friend not found.</p>
                <Link to="/" className="mt-4 inline-block text-[#2D4F42] hover:underline text-sm">
                    ← Back to home
                </Link>
            </div>
        );
    }

    const currentGoal = goalDays ?? friend.goal;

    return (
        <div className="max-w-4xl mx-auto py-6">
            {/* Back link */}
            <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
            >
                <FiArrowLeft size={14} />
                Back to friends
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* ── LEFT COLUMN ─────────────────────────────────────── */}
                <div className="flex flex-col gap-3">

                    {/* Profile card */}
                    <div className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center gap-2 shadow-sm">
                        <img
                            src={friend.picture}
                            alt={friend.name}
                            className="w-20 h-20 rounded-full object-cover ring-2 ring-white shadow mb-1"
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=2D4F42&color=fff`;
                            }}
                        />
                        <h2 className="text-base font-bold text-gray-800">{friend.name}</h2>

                        {/* Status badge */}
                        <div>{getStatusBadge(friend)}</div>

                        {/* Tags */}
                        <div className="flex flex-wrap justify-center gap-1 mt-1">
                            {friend.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-wide ${getTagColor(tag)}`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Bio */}
                        <p className="text-xs text-gray-400 italic mt-1 leading-relaxed">
                            "{friend.bio}"
                        </p>

                        {/* Email */}
                        <p className="text-xs text-gray-400">
                            Preferred: <a href={`mailto:${friend.email}`} className="text-[#2D4F42] hover:underline">{friend.email}</a>
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
                        <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <FiBellOff size={15} className="text-gray-400" />
                            Snooze 2 Weeks
                        </button>
                        <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                            <FiArchive size={15} className="text-gray-400" />
                            Archive
                        </button>
                        <button className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                            <FiTrash2 size={15} className="text-red-400" />
                            Delete
                        </button>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ────────────────────────────────────── */}
                <div className="md:col-span-2 flex flex-col gap-4">

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-gray-800">{friend.days_since_contact}</span>
                            <span className="text-xs text-gray-400 mt-1">Days Since Contact</span>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-gray-800">{currentGoal}</span>
                            <span className="text-xs text-gray-400 mt-1">Goal (Days)</span>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col items-center justify-center text-center">
                            <span className="text-xl font-bold text-gray-800">{formatDate(friend.next_due_date)}</span>
                            <span className="text-xs text-gray-400 mt-1">Next Due</span>
                        </div>
                    </div>

                    {/* Relationship Goal */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-700">Relationship Goal</h3>
                            <button
                                onClick={() => setEditingGoal(!editingGoal)}
                                className="text-xs border border-gray-200 px-3 py-1 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                                {editingGoal ? 'Save' : 'Edit'}
                            </button>
                        </div>

                        {editingGoal ? (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Connect every</span>
                                <input
                                    type="number"
                                    value={goalDays ?? friend.goal}
                                    min={1}
                                    onChange={(e) => setGoalDays(Number(e.target.value))}
                                    className="input input-sm input-bordered w-20 text-center font-bold text-gray-800"
                                />
                                <span className="text-sm text-gray-500">days</span>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">
                                Connect every <strong className="text-gray-800">{currentGoal} days</strong>
                            </p>
                        )}

                        {/* Progress bar */}
                        <div className="mt-4">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>{friend.days_since_contact}d elapsed</span>
                                <span>{currentGoal}d goal</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${friend.days_since_contact > currentGoal
                                        ? 'bg-red-400'
                                        : friend.days_since_contact / currentGoal >= 0.8
                                            ? 'bg-amber-400'
                                            : 'bg-emerald-400'
                                        }`}
                                    style={{ width: `${Math.min((friend.days_since_contact / currentGoal) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Check-In */}
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Check-In</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <button className="flex flex-col items-center justify-center gap-2 border border-gray-100 rounded-xl py-4 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 text-sm text-gray-600">
                                <FiPhone size={20} className="text-gray-500" />
                                Call
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 border border-gray-100 rounded-xl py-4 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 text-sm text-gray-600">
                                <FiMessageSquare size={20} className="text-gray-500" />
                                Text
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 border border-gray-100 rounded-xl py-4 hover:bg-gray-50 hover:border-gray-200 transition-all duration-200 text-sm text-gray-600">
                                <FiVideo size={20} className="text-gray-500" />
                                Video
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FriendDetail;