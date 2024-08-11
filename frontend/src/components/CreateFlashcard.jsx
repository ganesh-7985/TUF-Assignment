import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; 

const CreateFlashcard = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://tuf-flashcards-backend.onrender.com/flashcards', { question, answer });
            // You might want to update your state here or notify the user about successful creation
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.error('Error adding flashcard:', error);
        }
    };

    const handleAddFlashcard = (flashcard) => {
        // Handle adding flashcard (e.g., updating state)
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gray-700 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6">Welcome to Flashcard Guru</h1>
                    <p className="text-xl mb-8">Your Ultimate Tool for Efficient Learning and Mastery.</p>
                    
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-100">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-12">Why Choose Flashcard Guru?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Easy to Use</h3>
                            <p>Create, edit, and manage your flashcards effortlessly with our intuitive interface.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Flexible Learning</h3>
                            <p>Flip through flashcards at your own pace and track your progress as you go.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-4">Customizable</h3>
                            <p>Personalize your flashcards to suit your learning style and subject matter.</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-10'>
                <button 
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded"
                    >
                        Create New Flashcard
                    </button>
                </div>
            </section>

            {/* Flashcard Creation Modal */}
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} onAddFlashcard={handleAddFlashcard} />
        </div>
    );
};

export default CreateFlashcard;
