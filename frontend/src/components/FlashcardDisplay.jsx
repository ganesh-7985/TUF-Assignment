import React, { useState } from 'react';

const FlashcardDisplay = ({ flashcards }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);

    const handleNext = () => {
        setFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrev = () => {
        setFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    if (flashcards.length === 0) return <p className="text-center text-gray-500">No flashcards available.</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen overflow-y-hidden p-4 bg-gray-300">
            <h1 className="text-4xl font-bold text-black mb-8">FLASHCARDS</h1>
            <div
                className="w-full max-w-2xl p-10 rounded-lg shadow-lg text-center cursor-pointer bg-gray-700"
                onClick={handleFlip}
                style={{ minHeight: '300px', maxHeight: '300px' }}
            >
                <div className="flex flex-col items-center justify-center h-full">
                    <p >
                        {flipped ? <div className="text-xl font-semibold text-white mb-4">{flashcards[currentIndex].answer}</div> : <div className="text-2xl font-semibold text-white mb-4">{flashcards[currentIndex].question}</div>}
                    </p>
                    <p className="text-sm text-gray-400">
                        {flipped ? "Click again to see the question" : "Click to reveal the answer"}
                    </p>
                </div>
            </div>
            <div className="flex justify-between w-full max-w-2xl mt-8">
                <button
                    onClick={handlePrev}
                    className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default FlashcardDisplay;