
import { useState, useContext, useEffect } from "react";
import { SpaceBetween } from "../UIKit";
import "../App.css";
import { UpdateTweets } from "../Context/UpdateTweets";
import APIController from "../config/FirebaseController";
import { Button } from "bootstrap";

const AddTweet = () => {
    const { addTweet, tweets, updateTweetsList, changeBackground } = useContext(UpdateTweets);
    const [tweet, setTweet] = useState("");
    const [allTweets, setAllTweets] = useState(tweets);
    const [title, setTitle] = useState("");
    const [searchQuerry, setSearchQuerry] = useState("")
    const [searchType, setSearchType] = useState("")

    useEffect(() => {
        updateTweetsList(allTweets)
    }, [!searchQuerry.length])

    useEffect(() => {
        if (searchType === "tweets") {
            document.getElementById("tweets").style.color = "blue"
            document.getElementById("users").style.color = "white"
        }
        else if (searchType === "users") {
            document.getElementById("users").style.color = "blue"
            document.getElementById("tweets").style.color = "white"
        }
    }, [searchType])

    const handleChange = (event) => {
        setTweet(event.target.value);
    };

    const handleClick = async () => {
        const username = await APIController.getCurrentUser()
        addTweet(username.displayName, tweet, new Date());
        setTweet("");
    };

    const sortTweets = async (flag) => {
        changeBackground(flag)
        if (!flag) {
            setAllTweets(tweets);
            const currentUserName = await APIController.getCurrentUser().displayName
            let myTweets = tweets.filter(
                (tweet) =>
                    tweet.username === currentUserName
            );
            setTitle("My Tweets");
            updateTweetsList(myTweets);
        } else {
            setTitle("All Tweets");
            updateTweetsList(allTweets);
        }
    };

    const dropDown = () => {
        return (
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="sort"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    {title ? title : "Sort"}
                </button>
                <ul className="dropdown-menu" aria-labelledby="sort">
                    <li>
                        <button className="btn" onClick={() => sortTweets(true)}>
                            All Tweets
                        </button>
                    </li>
                    <li>
                        <button className="btn" onClick={() => sortTweets(false)}>
                            My Tweets
                        </button>
                    </li>
                </ul>
            </div>
        );
    };

    const searchBar = () => {
        const handleSearchQuerry = () => {
            setAllTweets(tweets)
            if (searchType === "tweets") {//Search by tweets
                let tweetsToDisplay = []
                for (let t of tweets) {
                    const tweetToString = t.content.toString()
                    if (tweetToString === searchQuerry)
                        tweetsToDisplay.push(t)
                }
                updateTweetsList(tweetsToDisplay)
            } else {//search by Username
                const searchByUsername = tweets.filter(t => t.username === searchQuerry)
                updateTweetsList(searchByUsername)
            }
        }
        return (
            <>
                <div className="input-group mb-3">
                    <button id="users" className="btn btn-outline-secondary" type="button" onClick={() => setSearchType("users")}>Users</button>
                    <button id="tweets" className="btn btn-outline-secondary" type="button" onClick={() => setSearchType("tweets")}> Tweets</button>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        aria-label="Example text with two button addons"
                        onInput={(e) => setSearchQuerry(e.target.value)} />
                    <button className="btn btn-primary" onClick={() => handleSearchQuerry()}>Search</button>
                </div>

            </>
        )
    }

    return (
        <div>
            <textarea
                rows="10"
                cols="140"
                placeholder="What's on your mind?"
                maxLength="140"
                value={tweet}
                style={{ color: "black" }}
                onChange={handleChange}
            ></textarea>
            {/* <div style={{ display: "flex", flexDirection: "column" }}> */}
            <SpaceBetween>
                <small>{140 - tweet.length} remaining</small>
                <button
                    className="Tweet-btn"
                    onClick={handleClick}
                    disabled={!tweet.length || tweet.length === 140}
                >
                    Tweet
                </button>
            </SpaceBetween>
            {searchBar()}
            {/* </div> */}
            {dropDown()}
        </div>
    );
};

export default AddTweet;
