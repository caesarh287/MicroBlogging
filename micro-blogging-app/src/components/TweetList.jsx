import { nanoid } from "nanoid";
import Tweet from "./Tweet";
import { useContext, useState } from "react";
import { UpdateTweets } from "../Context/UpdateTweets";
import React from "react";

export default function TweetList({ flag }) {
    const { tweets } = useContext(UpdateTweets);

    return (
        <div>
            {tweets.map((tweet) => (
                <Tweet
                    key={tweet.username + nanoid()}
                    username={tweet.username}
                    text={tweet.content}
                    date={tweet.date}
                    flag={flag}
                />
            ))}
        </div>
    );
}
