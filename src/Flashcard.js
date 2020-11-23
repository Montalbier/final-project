import React, { useState } from "react";

export default function Flashcard(props) {
    const [flip, setFlip] = useState(false);

    const onHandleClick = () => {
        if (flip === true) {
            props.onReflip();
        }
        setFlip(!flip);
    };

    return (
        <div className={`card ${flip ? "flip" : " "}`} onClick={onHandleClick}>
            <div className="front">{props.flashcard.english}</div>
            <div className="back"> {props.flashcard.spanish}</div>
        </div>
    );
}
