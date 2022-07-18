import React, { useState, useEffect } from "react";
import TweetList from "./TweetList";
import AddTweet from "./AddTweet";
import { UpdateTweets } from "../Context/UpdateTweets";
import * as ReactBootStrap from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import APIController from "../config/FirebaseController";

const Wrapper = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [flag, setFlag] = useState(true)

    useEffect(() => {
        (async () => {
            const fireList = await APIController.getAllTweets();
            setTweets(fireList);
            fetchTweets();
        })();
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchTweets();
        return () => {
            setTweets([]);
            setLoading(false);
            setErrMessage("");
        };
    }, []);

    const fetchTweets = async () => {
        const res = await APIController.getAllTweets();
        setTweets(res);
        setLoading(false);
    };

    const addTweet = async (username, content) => {
        await APIController.addNewTweets({
            username,
            content,
            date: new Date().toLocaleString(),
            userid: ""
        });
        await fetchTweets();
        return true;
    };

    const updateTweetsList = (newTweetsList) => {
        setTweets(newTweetsList);
    };

    const changeBackground = (status) => {
        setFlag(status)
    }

    return (
        <>
            <UpdateTweets.Provider value={{ addTweet, tweets, updateTweetsList, changeBackground }}>
                {!errMessage ? (
                    loading ? (
                        <ReactBootStrap.Spinner animation="border" />
                    ) : (
                        <div className="Feed">
                            <AddTweet handleAddTweet={addTweet} />
                            <TweetList tweets={tweets} flag={flag} />
                        </div>
                    )
                ) : (
                    <div>Error:{errMessage}</div>
                )}
            </UpdateTweets.Provider>
        </>
    );
};

export default Wrapper;
