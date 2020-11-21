import React from "react";
import Flashcard from "./Flashcard";

//{ flashcards } is just destructuring props.flashcards :)

export default function Deck({ flashcards }) {
    return (
        <div className="card-deck">
            {flashcards.map((flashcard) => {
                return <Flashcard flashcard={flashcard} key={flashcard.id} />;
            })}
        </div>
    );
}
