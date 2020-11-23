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
        <>
            <div>
                <div className="good-learn">
                    <img
                        style={{ width: "600px", margin: "20px 0 20px 0" }}
                        src="/assets/1goodlearn.png"
                    />
                </div>
                <div>
                    <p className="good-learn-text">
                        Try to remember the word and only turn the card when you
                        thought enough about it!{" "}
                    </p>
                </div>
                <div className="card-deck">
                    <Flashcard
                        onReflip={onReflip}
                        flashcard={actualFlashcard}
                        key={actualFlashcard.id}
                    />
                </div>
            </div>
        </>
    );
}
