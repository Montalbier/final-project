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
        <div style={{ display: "flex" }}>
            <div>
                <img
                    src="/assets/1landscape.png"
                    style={{ width: "400px", flexWrap: "wrap" }}
                />
            </div>
            <div>
                <div className="good-learn">
                    <img
                        style={{ width: "300px", margin: "20px 0 20px 0" }}
                        src="/assets/goodlearn.png"
                    />
                </div>
                <div>
                    <p className="good-learn-text">
                        Flashcards are a simple and common way to study for
                        school and memorize facts, but they are also very useful
                        at home for learning a new language. <br />
                        Read the cards out loud. Take your time doing this.{" "}
                        <br />
                        By speaking and hearing the language, you’ll create an
                        even stronger connection that will help you remember
                        later.{" "}
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
            <div>
                <img
                    src="/assets/1landscape.png"
                    style={{ width: "400px", flexWrap: "wrap" }}
                />
            </div>
        </div>
    );
}
