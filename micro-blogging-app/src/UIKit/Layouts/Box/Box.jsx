import './Box.css';

export const Box = (props) => {
    return (
        <div className="Box">
            {props.children}
        </div>
    )
}

export default Box;
