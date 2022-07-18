import { useCallback, useContext, useEffect, useState } from "react";
import APIController from "../config/FirebaseController";
import AuthContext from "../Context/AuthContext";


export default function useTweets() {
    const [tweets, setTweets] = useState([]);
    const [filters, setFilters] = useState([]);
    const { displayName, userInfo } = useContext(AuthContext);

    const getTweetsFromServer = useCallback(async () => {
        const notesList = await APIController.getAllNotes();
        setTweets(notesList);
    }, []);

    const addNewTweet = useCallback(async (content) => {
        await APIController.addNewTweet({
            username: displayName,
            userid: userInfo.uid,
            content,
            date: new Date().getTime()
        })
        getTweetsFromServer();
        return true;
    }, [displayName, userInfo]);

    const deleteTweetById = useCallback(async (id) => {
        await APIController.deleteTweetById(id);
        getTweetsFromServer();
    }, []);

    useEffect(() => {
        console.log('filters', filters);
        const unsubscribe = APIController.startObservingNotes(filters, (notesList) => {
            setTweets(notesList);
        });
        return unsubscribe;
    }, [filters]);

    return {
        tweets,
        setFilters,
        filters,
        addNewTweet,
        deleteTweetById
    }
}