import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [editingFlashcard, setEditingFlashcard] = useState(null);
    const [editQuestion, setEditQuestion] = useState('');
    const [editAnswer, setEditAnswer] = useState('');

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get('https://tuf-flashcards-backend.onrender.com/flashcards');
                setFlashcards(response.data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchFlashcards();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tuf-flashcards-backend.onrender.com/flashcards/${id}`);
            setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
        } catch (error) {
            console.error('Error deleting flashcard:', error);
        }
    };

    const handleEdit = async (id) => {
        const updatedFlashcard = { question: editQuestion, answer: editAnswer };
        try {
            await axios.put(`https://tuf-flashcards-backend.onrender.com/flashcards/${id}`, updatedFlashcard);
            setFlashcards(flashcards.map(flashcard =>
                flashcard.id === id ? { ...flashcard, ...updatedFlashcard } : flashcard
            ));
            setEditingFlashcard(null);
            setEditQuestion('');
            setEditAnswer('');
        } catch (error) {
            console.error('Error updating flashcard:', error);
        }
    };

    const handleEditClick = (flashcard) => {
        setEditingFlashcard(flashcard.id);
        setEditQuestion(flashcard.question);
        setEditAnswer(flashcard.answer);
    };

    const handleCancelEdit = () => {
        setEditingFlashcard(null);
        setEditQuestion('');
        setEditAnswer('');
    };

    if (flashcards.length === 0) return <p className="text-center text-gray-500">No flashcards available.</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {flashcards.map((flashcard) => (
                    <div
                        key={flashcard.id}
                        className="bg-white p-6 rounded-lg shadow-lg flex flex-col"
                        style={{ height: 'auto', width: '350px' }} // Adjusted height to auto
                    >
                        {editingFlashcard === flashcard.id ? (
                            <div className="flex flex-col h-full">
                                <input
                                    type="text"
                                    value={editQuestion}
                                    onChange={(e) => setEditQuestion(e.target.value)}
                                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                                    placeholder="Edit question"
                                />
                                <textarea
                                    type="text"
                                    value={editAnswer}
                                    onChange={(e) => setEditAnswer(e.target.value)}
                                    className="w-full p-2 mb-2 border border-gray-300 rounded"
                                    placeholder="Edit answer"
                                />
                                <div className="flex justify-between mt-auto">
                                    <button
                                        onClick={() => handleEdit(flashcard.id)}
                                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col h-full">
                                <p className="text-lg font-medium text-gray-900" style={{ overflow: 'hidden', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                    {flashcard.question}
                                </p>
                                <p className="text-sm text-gray-700 mt-2" style={{ overflow: 'hidden', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                    {flashcard.answer.length > 200 ? flashcard.answer.substring(0, 200) + '...' : flashcard.answer}
                                </p>
                                <div className="mt-auto flex justify-between">
                                    <button
                                        onClick={() => handleEditClick(flashcard)}
                                        className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(flashcard.id)}
                                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
