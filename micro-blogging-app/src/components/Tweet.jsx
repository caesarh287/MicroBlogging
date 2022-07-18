import { SpaceBetween, Box } from "../UIKit";
import "../App.css";

export const Tweet = (props) => {
    return (
        <div className="box" style={!props.flag ? { backgroundColor: "DarkSalmon" } : {}}>
            <SpaceBetween>
                <div className="Tweet-header">
                    {props.username}
                </div>
                <div className="Tweet-header">{props.date}</div>
            </SpaceBetween>
            <div>
                <span>{props.text}</span>
            </div>
        </div>
    );
};

export default Tweet;
