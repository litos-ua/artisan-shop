import React from "react";
import {useNavigate} from "react-router-dom";

export function HomeButton(props) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };

    return (
        <button type="button" onClick={handleClick}>
            {props.buttonName}
        </button>
    )
}