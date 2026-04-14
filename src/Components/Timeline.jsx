import React, { useState } from 'react';
import { useFriends } from '../context/FriendsContext';
import { FiPhone, FiMessageSquare, FiVideo, FiUsers, FiFilter } from 'react-icons/fi';


const TYPE_CONFIG = {
    Call: { Icon: FiPhone, color: 'text-gray-600', bg: 'bg-gray-100' },
    Text: { Icon: FiMessageSquare, color: 'text-gray-500', bg: 'bg-gray-100' },
    Video: { Icon: FiVideo, color: 'text-gray-600', bg: 'bg-gray-100' },
    Meetup: { Icon: FiUsers, color: 'text-amber-600', bg: 'bg-amber-100' },
};

const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const FILTER_OPTIONS = ['All', 'Call', 'Text', 'Video', 'Meetup'];

// ── main component ────────────────────────────────────────────────────────────

const Timeline = () => {
    const { timeline } = useFriends();
    const [filter, setFilter] = useState('All');

    const filtered = filter === 'All'
        ? timeline
        : timeline.filter((e) => e.type === filter);

    return (
        <div className="max-w-2xl mx-auto py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Timeline</h1>

            {/* Filter dropdown */}
            <div className="mb-6">
                <div className="relative inline-block">
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="select select-bordered select-sm pr-8 text-sm text-gray-600 bg-white appearance-none cursor-pointer"
                    >
                        {FILTER_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt === 'All' ? 'Filter timeline' : opt}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Timeline list */}
            {filtered.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-10">No entries yet.</p>
            ) : (
                <div className="flex flex-col">
                    {filtered.map((entry, idx) => {
                        const config = TYPE_CONFIG[entry.type] ?? TYPE_CONFIG['Call'];
                        const { Icon, color, bg } = config;
                        const isLast = idx === filtered.length - 1;

                        return (
                            <div key={entry.id} className="flex items-start gap-4">
                                {/* Icon + vertical line */}
                                <div className="flex flex-col items-center">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                                        <Icon size={16} className={color} />
                                    </div>
                                    {!isLast && (
                                        <div className="w-px flex-1 bg-gray-100 my-1" style={{ minHeight: '24px' }} />
                                    )}
                                </div>

                                {/* Content */}
                                <div className={`flex-1 pb-5 ${isLast ? '' : ''}`}>
                                    <div className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm">
                                        <p className="text-sm text-gray-800">
                                            <span className="font-semibold">{entry.type}</span>
                                            <span className="text-gray-500"> with {entry.name}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(entry.date)}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Timeline;