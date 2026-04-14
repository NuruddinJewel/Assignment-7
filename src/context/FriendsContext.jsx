import { createContext, useContext, useState, useEffect } from 'react';

const FriendsContext = createContext();

export const FriendsProvider = ({ children }) => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/data.json')
            .then(res => res.json())
            .then(json => {
                setFriends(json);
                setLoading(false);
            });
    }, []);

    return (
        <FriendsContext.Provider value={{ friends, loading }}>
            {children}
        </FriendsContext.Provider>
    );
};

export const useFriends = () => useContext(FriendsContext);