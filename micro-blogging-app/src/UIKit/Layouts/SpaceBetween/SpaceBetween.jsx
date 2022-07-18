import './SpaceBetween.css';

export const SpaceBetween = (props) => {
    return (
        <div className="SpaceBetween">
            {props.children}
        </div>
    )
}

export default SpaceBetween;
