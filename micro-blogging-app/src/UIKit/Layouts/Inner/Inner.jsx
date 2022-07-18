import './Inner.css';

export const Inner = (props) => {
    return (
        <div className="Inner">
            {props.children}
        </div>
    )
}

export default Inner;
