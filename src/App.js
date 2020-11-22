import { BrowserRouter, Route } from "react-router-dom";
import React, { useState } from "react";
import Deck from "./Deck";
import Map from "./Map";

export default function App({ flashcard }) {
    const [flashcards, setFlashcards] = useState(sampleFlashcards);
    return (
        <BrowserRouter>
            <div>
                <Route
                    path="/deck"
                    render={() => <Deck flashcards={flashcards} />}
                />
            </div>
            <div>
                <Route path="/map" render={() => <Map />} />
            </div>
        </BrowserRouter>
    );
}

/*
🔄 FLASHCARDS CODE STARTS HERE 🔄
*/
// hardcoding questions //

const sampleFlashcards = [
    {
        id: 1,
        english: "How much does it cost?",
        spanish: "¿Cuánto cuesta?",
    },
    {
        id: 2,
        english: "How are you?",
        spanish: "¿Cómo estás?",
    },
    {
        id: 3,
        english: "Where is _____ located?",
        spanish: "¿Dónde queda _____?",
    },
];

/*
🔄 FLASHCARDS CODE ENDS HERE 🔄
*/
