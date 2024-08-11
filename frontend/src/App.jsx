import React,{useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import FlashcardDisplay from './components/FlashcardDisplay';
import CreateFlashcard from './components/CreateFlashcard';
import Dashboard from './components/Dashboard';

const App = () => {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await fetch('http://localhost:5050/flashcards');
                const data = await response.json();
                setFlashcards(data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchFlashcards();
    }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<FlashcardDisplay flashcards={flashcards} />} />
                <Route path="/create" element={<CreateFlashcard onAdd={(newCard) => setFlashcards([...flashcards, newCard])} />} />
                <Route path="/display" element={<FlashcardDisplay flashcards={flashcards} />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
