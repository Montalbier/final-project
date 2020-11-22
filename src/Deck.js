import React, { useState } from "react";
import Flashcard from "./Flashcard";

//{ flashcards } is just destructuring props.flashcards :)

export default function Deck({ flashcards }) {
    const [actualFlashcard, setActualFlashcard] = useState(
        flashcards[Math.floor(Math.random() * flashcards.length)]
    );

    const onReflip = () => {
        setActualFlashcard(
            flashcards[Math.floor(Math.random() * flashcards.length)]
        );
    };

    return (
        <div className="card-deck">
            <Flashcard
                onReflip={onReflip}
                flashcard={actualFlashcard}
                key={actualFlashcard.id}
            />
            ;
        </div>
    );
}
