import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center flex-wrap">
                <Link to="/" className="text-white text-2xl font-bold">Flashcard Guru</Link>
                <div className="flex space-x-4 mt-2 sm:mt-0">
                    <Link to="/create" className="text-white hover:text-gray-400">FlashCard</Link>
                    <Link to="/display" className="text-white hover:text-gray-400">Display Cards</Link>
                    <Link to="/dashboard" className="text-white hover:text-gray-400">Dashboard</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;