import { createContext, useContext, useState, useEffect } from 'react';

const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [timeline, setTimeline] = useState([]); // Added timeline state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(json => {
                setFriends(json);
                // Initialize timeline if your JSON has it, or keep empty
                setTimeline(json.timeline || []);
                setLoading(false);
            });
    }, []);

    // Function to add new activity
    const addTimelineEntry = (type, personName) => {
        const newEntry = {
            id: Date.now(), // Unique ID based on timestamp
            type: type,
            name: personName,
            date: new Date().toISOString(), // Current date
        };
        setTimeline(prev => [newEntry, ...prev]);
    };

    return (
        <FriendsContext.Provider value={{ friends, timeline, loading, addTimelineEntry }}>
            {children}
        </FriendsContext.Provider>
    );
};

export const useFriends = () => useContext(FriendsContext);