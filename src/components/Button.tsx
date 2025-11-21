import "@styles/css/componentsCss/button.css";

interface ButtonProps {
    title?: string;
    classNameProps?: string;
    onClick?: () => void;
    icon?: string;
}

function Button({title="клик", classNameProps, onClick, icon}: ButtonProps) {
    return (
        <button className={`main-btn ${classNameProps}`} onClick={onClick}>{icon}{title}</button>
    );
}

export default Button;