import React, { useState } from "react";
import Deck from "./Deck";

/*
🔄 FLASHCARDS CODE STARTS HERE 🔄
*/

export default function App({ flashcard }) {
    const [flashcards, setFlashcards] = useState(sampleFlashcards);
    return (
        <div>
            <Deck flashcards={flashcards} />
        </div>
    );
}

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
