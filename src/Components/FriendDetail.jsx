import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiClock, FiTag, FiTarget } from 'react-icons/fi';
import { useFriends } from '../context/FriendsContext';



const FriendDetail = () => {
    const { id } = useParams();
    const { friends, loading } = useFriends();

    if (loading) return <p className="text-center py-10 text-gray-400">Loading...</p>;

    const friend = friends.find((f) => f.id === parseInt(id));

    if (!friend) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-16 text-center">
                <p className="text-gray-400 text-lg">Friend not found.</p>
                <Link to="/friends" className="mt-4 inline-block text-indigo-500 hover:underline text-sm">
                    ← Back to friends
                </Link>
            </div>
        );
    }

    const ratio = friend.days_since_contact / friend.goal;
    const isOverdue = friend.status === 'overdue' || friend.days_since_contact > friend.goal;
    const isAlmostDue = !isOverdue && ratio >= 0.8;

    const statusLabel = isOverdue ? 'Overdue' : isAlmostDue ? 'Almost Due' : 'On Track';
    const statusClass = isOverdue
        ? 'bg-red-100 text-red-600'
        : isAlmostDue
            ? 'bg-amber-100 text-amber-600'
            : 'bg-emerald-100 text-emerald-600';

    const progressPct = Math.min((friend.days_since_contact / friend.goal) * 100, 100);
    const progressColor = isOverdue ? 'bg-red-400' : isAlmostDue ? 'bg-amber-400' : 'bg-emerald-400';

    return (
        <div className="max-w-xl mx-auto px-6 py-10">
            <Link
                to="/friends"
                className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
            >
                <FiArrowLeft size={14} />
                Back to friends
            </Link>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-5">
                <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-50 shadow"
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.name)}&background=6366f1&color=fff`;
                    }}
                />

                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800">{friend.name}</h1>
                    <a
                        href={`mailto:${friend.email}`}
                        className="text-sm text-indigo-400 hover:underline flex items-center justify-center gap-1 mt-1"
                    >
                        <FiMail size={13} />
                        {friend.email}
                    </a>
                </div>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClass}`}>
                    {statusLabel}
                </span>

                <p className="text-sm text-gray-500 text-center leading-relaxed max-w-sm">{friend.bio}</p>

                <div className="flex flex-wrap justify-center gap-2">
                    {friend.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full font-medium"
                        >
                            <FiTag size={10} />
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="w-full">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                        <span className="flex items-center gap-1">
                            <FiClock size={11} /> {friend.days_since_contact}d since contact
                        </span>
                        <span className="flex items-center gap-1">
                            <FiTarget size={11} /> Goal: every {friend.goal}d
                        </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5 text-right">
                        Next due: {friend.next_due_date}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FriendDetail;