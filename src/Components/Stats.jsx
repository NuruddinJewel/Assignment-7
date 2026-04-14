import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useFriends } from '../context/FriendsContext';


const Stats = () => {
    const { timeline } = useFriends();

    // Process timeline data for the chart
    const dataMap = timeline.reduce((acc, entry) => {
        acc[entry.type] = (acc[entry.type] || 0) + 1;
        return acc;
    }, { Text: 0, Call: 0, Video: 0 });

    const chartData = [
        { name: 'Text', value: dataMap.Text, color: '#8B5CF6' }, // Purple
        { name: 'Call', value: dataMap.Call, color: '#2D4F42' }, // Dark Green
        { name: 'Video', value: dataMap.Video, color: '#34D399' }, // Light Green
    ];

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Friendship Analytics</h1>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 min-h-[400px]">
                <h3 className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wider">
                    By Interaction Type
                </h3>

                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Legend
                                iconType="circle"
                                verticalAlign="bottom"
                                align="center"
                                formatter={(value) => <span className="text-gray-600 text-sm ml-1">{value}</span>}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {timeline.length === 0 && (
                    <p className="text-center text-gray-400 text-sm mt-4 italic">
                        No interactions logged yet. Go to a friend's profile to check-in!
                    </p>
                )}
            </div>
        </div>
    );
};

export default Stats;

